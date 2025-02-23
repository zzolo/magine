import { writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { program } from '@commander-js/extra-typings';
import pdf2md from '@opendocsg/pdf2md';

program
  .name('update-rules')
  .description('Download and convert Magic rules to markdown to use in various places.');

const options = program.parse();

const response = await fetch('https://magic.wizards.com/en/rules');
if (!response.ok) {
  console.error('Unable to fetch Rules pages.');
  process.exit(1);
}

// Parse and find linke
const body = await response.text();
const pdfLinkSearch = body.match(/href="(http.*?\.pdf)"/i);

if (pdfLinkSearch && pdfLinkSearch[1]) {
  // Write file locally
  const pdfLink = pdfLinkSearch[1];
  const pdfFileName = basename(pdfLink);
  const pdfBuffer = await (await (await fetch(pdfLink)).blob()).arrayBuffer();
  writeFileSync(`assets/${pdfFileName}`, Buffer.from(pdfBuffer));

  // Convert to MD
  const markdownRules = await pdf2md(pdfBuffer);

  // Cursor rules
  const rulesOutput = `---
description: For creating the Magic engine written in typescript, this file descripes the rules of Magic the game and should be applied to the coding logic and not the coding syntax.
globs: src/**/*.ts
---

${markdownRules}
`;
  writeFileSync('.cursor/rules/magic-rules.mdc', rulesOutput);
}
