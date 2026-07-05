#!/usr/bin/env node
// Run this locally: node scripts/generate-admin-credentials.mjs "YourChosenPassword"
// It never sends anything anywhere — it just prints values for you to paste into
// Vercel's Environment Variables settings.

import { randomBytes, createHash } from 'crypto'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/generate-admin-credentials.mjs "YourChosenPassword"')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Please choose a password with at least 8 characters.')
  process.exit(1)
}

const salt = randomBytes(16).toString('hex')
const hash = createHash('sha256').update(salt + password).digest('hex')
const sessionSecret = randomBytes(32).toString('hex')

console.log('\nAdd these three as Environment Variables in Vercel (Project → Settings → Environment Variables), then redeploy:\n')
console.log(`ADMIN_PASSWORD_SALT=${salt}`)
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`ADMIN_SESSION_SECRET=${sessionSecret}`)
console.log('\nYour login password at /admin/login will be exactly the password you passed to this script.')
console.log('Nothing here needs to be committed to git — only the three lines above go into Vercel.\n')
