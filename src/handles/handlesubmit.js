import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (name, score, time, date) => {
    const ref = collection(firestore, "test_data") 
    console.log(name, score, time, date);
    let data = {
        Name: name,
        Score: score,
        Time: time,
        Date: date
    }
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}

export default handleSubmit