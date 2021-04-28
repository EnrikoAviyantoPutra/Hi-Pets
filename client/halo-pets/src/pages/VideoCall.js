import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { db } from '../services/firebase'
import { auth } from "../services/firebase";

export default function VideoCall() {
  const params = useParams()
  const [user, setUser] = useState(auth().currentUser)
  const [readError, setreadError] = useState(null)
  const [doctor, setDoctor] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setreadError(null)
    async function fetchDoctor() {
      try {
        const doctor = db.ref("doctors")
        doctor.child(params.id).on("value", snapshot => {
          let dataDoctor = [];
          snapshot.forEach((snap) => {
            dataDoctor.push(snap.val());
          });
          setDoctor(c => dataDoctor)
        });
      } catch (error) {
        setreadError(error.message)
      }
    }
    fetchDoctor()
  }, [dispatch])
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>VideoCall</h1>
      <p>{JSON.stringify(doctor)}</p>
    </div >
  )
}