import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

//function returns names and ids for all json obj in array sorted by name property
export async function getSortedList() {
  const snapshot = await getDocs( collection(db, "pokemon") );
  const jsonObj = snapshot.docs.map(
    (d) => (
      {
        id: d.id,
        ...d.data() // captures fields and data
      }
    )
  );

  //sort json array by name property
  jsonObj.sort(
    function(a,b) {
      return a.name.localeCompare(b.name);
    }
  );

  //use map() on array to extract just id + name props into new array of obj values
  return jsonObj.map(
    function(item) {
      return {
        id: item.id.toString(),
        name: item.name
      };
    }
  );
}

//fucntion returns ids for all json objs in aray
export async function getAllIds() {
  const snapshot = await getDocs( collection(db, "pokemon") );
  const jsonObj = snapshot.docs.map(
    (d) => (
      {
        id: d.id,
      }
    )
  );

  // use map() on array to extract just id + name props into new array of obj values
  return jsonObj.map(
    function(item) {
      return {
        params: {
          id: item.id.toString()
        }
      };
    }
  );
  
}

//function return ALL of props for one single obj with a match id prop value
export async function getData(idRequested) {
  const docRef = doc(db, "pokemon", idRequested);
  const d = await getDoc(docRef);

  let objReturned;
  if (!d.exists) {
    objReturned = {};
  } else {
    objReturned = d.data();
  }

  return objReturned;
}