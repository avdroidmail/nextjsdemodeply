import mysql from 'mysql2/promise';

const credentialsToTest = [
  { user: 'root', password: 'password' },
  { user: 'root', password: '' },
  { user: 'root', password: 'root' },
  { user: 'root', password: 'admin' },
  { user: 'root', password: '123456' },
  { user: 'root', password: 'Password123!' },
];

async function testConnections() {
  for (const cred of credentialsToTest) {
    try {
      console.log(`Testing user: "${cred.user}", pass: "${cred.password}"...`);
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: cred.user,
        password: cred.password,
      });
      console.log(`SUCCESS! Connected with user: "${cred.user}", pass: "${cred.password}"`);
      await connection.end();
      return cred;
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }
}

testConnections();
