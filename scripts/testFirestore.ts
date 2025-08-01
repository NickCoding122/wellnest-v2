import { testWriteToFirestore, testReadFromFirestore } from '../lib/firestore';

(async () => {
  await testWriteToFirestore();
  await testReadFromFirestore();
})();
