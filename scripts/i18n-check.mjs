#!/usr/bin/env node
// Reports message keys that exist in the default locale (pl) but are missing in other locales.
// Report-only: partially translated locales are allowed — missing keys fall back to Polish at runtime.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const MESSAGES_DIR = new URL('../messages/', import.meta.url).pathname;
const DEFAULT_LOCALE = 'pl';

async function loadLocale(locale) {
  const dir = join(MESSAGES_DIR, locale);
  const files = (await readdir(dir)).filter((file) => file.endsWith('.json'));
  const entries = await Promise.all(
    files.map(async (file) => [file.slice(0, -'.json'.length), JSON.parse(await readFile(join(dir, file), 'utf8'))]),
  );
  return Object.fromEntries(entries);
}

function leafKeys(node, prefix = '') {
  return Object.entries(node).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value !== null && typeof value === 'object' ? leafKeys(value, path) : [path];
  });
}

const locales = (await readdir(MESSAGES_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const reference = new Set(leafKeys(await loadLocale(DEFAULT_LOCALE)));
let totalMissing = 0;

for (const locale of locales.filter((name) => name !== DEFAULT_LOCALE).sort()) {
  const keys = new Set(leafKeys(await loadLocale(locale)));
  const missing = [...reference].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !reference.has(key));
  totalMissing += missing.length;

  const coverage = (((reference.size - missing.length) / reference.size) * 100).toFixed(1);
  console.log(`${locale}: ${coverage}% (${reference.size - missing.length}/${reference.size})`);
  for (const key of missing) console.log(`  missing  ${key}  → falls back to ${DEFAULT_LOCALE}`);
  for (const key of extra) console.log(`  unused   ${key}  (not in ${DEFAULT_LOCALE})`);
}

if (totalMissing === 0) console.log('All locales are complete.');
