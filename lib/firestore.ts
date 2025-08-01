import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const testWriteToFirestore = async () => {
  const docRef = await addDoc(collection(db, 'test'), {
    message: 'Hello Firestore',
    timestamp: Date.now(),
  });
  console.log('Document written with ID:', docRef.id);
};

export const testReadFromFirestore = async () => {
  const snapshot = await getDocs(collection(db, 'test'));
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log('Documents:', docs);
  return docs;
};
