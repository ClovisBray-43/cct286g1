import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnTfjXEZaDy7MVHC4xxXhxtrNgABwGsNk",
  authDomain: "cct286-group1.firebaseapp.com",
  projectId: "cct286-group1",
  storageBucket: "cct286-group1.firebasestorage.app",
  messagingSenderId: "637362334261",
  appId: "1:637362334261:web:4096a751ab46040cde1f7c",
  measurementId: "G-SV50157GLF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getSelectedValue(name) {
  const checked = document.querySelector('input[name="' + name + '"]:checked');
  return checked ? checked.value : "";
}

function getText(id) {
  const el = document.getElementById(id);
  return el ? el.textContent.trim() : "";
}

function formatTime(value) {
  if (!value) return "just now";

  let date;
  if (typeof value.toDate === "function") {
    date = value.toDate();
  } else {
    date = new Date(value);
  }

  return date.toLocaleString();
}

function renderNotes(docs) {
  const notesList = document.getElementById("notesList");
  if (!notesList) return;

  if (!docs.length) {
    notesList.innerHTML = '<p class="notesEmpty">No notes yet.</p>';
    return;
  }

  notesList.innerHTML = docs.map(function (doc) {
    const data = doc.data();
    const safeText = (data.text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeMood = (data.mood || "unknown").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeTime = formatTime(data.createdAt).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return `
      <div class="noteItem">
        <p class="noteItemText">${safeText}</p>
        <p class="noteItemMeta">${safeMood} · ${safeTime}</p>
      </div>
    `;
  }).join("");
}

function bindNotesFeed() {
  const notesRef = collection(db, "moodNotes");
  const notesQuery = query(notesRef, orderBy("createdAt", "desc"), limit(6));

  onSnapshot(notesQuery, function (snapshot) {
    renderNotes(snapshot.docs);
  });
}

function bindSaveNote() {
  const btn = document.getElementById("btnSaveNote");
  const input = document.getElementById("noteInput");
  const status = document.getElementById("noteStatus");

  if (!btn || !input || !status) return;

  btn.addEventListener("click", async function () {
    const text = input.value.trim();
    if (!text) {
      status.textContent = "Please write something first.";
      return;
    }

    btn.disabled = true;
    status.textContent = "Saving...";

    try {
      await addDoc(collection(db, "moodNotes"), {
        text: text,
        mood: getSelectedValue("mood"),
        atmosphere: getSelectedValue("atm"),
        sound: getSelectedValue("sound"),
        resultTitle: getText("outTitle"),
        createdAt: serverTimestamp()
      });

      input.value = "";
      status.textContent = "Saved.";
    } catch (err) {
      console.error(err);
      status.textContent = "Failed to save.";
    } finally {
      btn.disabled = false;
    }
  });
}

bindNotesFeed();
bindSaveNote();