import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (name, score, date_and_time) => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically

    let data = {
        Name: name,
        Score: score,
        Date_and_Time: date_and_time
    }
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}

export default handleSubmit