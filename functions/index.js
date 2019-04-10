const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp()
const db = admin.firestore()

exports.postToVueServer = functions.https.onRequest((req, res) => {
  const data = req.body
  db.collection('competitions').doc(data.c).collection('posts').doc(data.uuid).set({
    name: data.name,
    acc: data.acc,
    uuid: data.uuid,
    post_at: admin.firestore.Timestamp.now()
  })
  res.status(200).send('Send!')
})
