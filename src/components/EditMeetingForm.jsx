// // frontend/src/components/EditMeetingForm.jsx
// import React, { useState } from "react";

// function EditMeetingForm({ meeting, onSubmit, onCancel }) {
//   // On initialise l'état avec les valeurs existantes
//   const [date, setDate] = useState(meeting.date.slice(0, 10)); // YYYY-MM-DD
//   const [title, setTitle] = useState(meeting.title);
//   const [summary, setSummary] = useState(meeting.summary);
//   const [agenda, setAgenda] = useState(meeting.agenda || []);

//   // Ajout d'item principal / sous-item
//   const [newAgendaText, setNewAgendaText] = useState("");
//   const [newSubItemText, setNewSubItemText] = useState("");
//   const [parentIndex, setParentIndex] = useState(null);

//   const handleAddAgendaItem = () => {
//     const trimmed = newAgendaText.trim();
//     if (!trimmed) return;
//     setAgenda((prev) => [...prev, { text: trimmed, subItems: [] }]);
//     setNewAgendaText("");
//   };

//   const handleAddSubItem = () => {
//     const trimmed = newSubItemText.trim();
//     if (!trimmed || parentIndex === null) return;
//     setAgenda((prev) => {
//       const copy = [...prev];
//       copy[parentIndex] = {
//         ...copy[parentIndex],
//         subItems: [...copy[parentIndex].subItems, { text: trimmed }],
//       };
//       return copy;
//     });
//     setNewSubItemText("");
//     setParentIndex(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!date || !title) {
//       alert("Date et titre obligatoires");
//       return;
//     }
//     // On reconstruit l'objet meeting mis à jour
//     const updated = {
//       ...meeting,
//       date,
//       title,
//       summary,
//       agenda,
//     };
//     onSubmit(updated);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded">
//       <h2 className="text-lg font-semibold mb-2">Éditer la réunion</h2>

//       {/* Date */}
//       <div className="mb-2">
//         <label className="block font-medium">Date</label>
//         <input
//           type="date"
//           className="border p-2 w-full rounded"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {/* Titre */}
//       <div className="mb-2">
//         <label className="block font-medium">Titre</label>
//         <input
//           type="text"
//           className="border p-2 w-full rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       {/* Agenda */}
//       <div className="mb-2">
//         <label className="block font-medium">Ordre du jour</label>
//         {/* Item principal */}
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             className="border p-2 w-full rounded"
//             placeholder="Ajouter un point..."
//             value={newAgendaText}
//             onChange={(e) => setNewAgendaText(e.target.value)}
//           />
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={handleAddAgendaItem}
//           >
//             + Item
//           </button>
//         </div>

//         {/* Sous-item */}
//         <div className="flex gap-2 mb-4">
//           <select
//             className="border p-2 rounded"
//             value={parentIndex ?? ""}
//             onChange={(e) =>
//               setParentIndex(
//                 e.target.value === "" ? null : Number(e.target.value)
//               )
//             }
//           >
//             <option value="">Item parent</option>
//             {agenda.map((item, idx) => (
//               <option key={idx} value={idx}>
//                 {item.text}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             className="border p-2 w-full rounded"
//             placeholder="Sous-point..."
//             value={newSubItemText}
//             onChange={(e) => setNewSubItemText(e.target.value)}
//           />
//           <button
//             type="button"
//             className="bg-blue-400 text-white px-4 py-2 rounded"
//             onClick={handleAddSubItem}
//           >
//             + Sous-item
//           </button>
//         </div>

//         {/* Aperçu */}
//         <ul className="list-disc list-inside space-y-1">
//           {agenda.map((item, idx) => (
//             <li key={idx} className="ml-4">
//               <b>{item.text}</b>
//               {item.subItems && item.subItems.length > 0 && (
//                 <ul className="list-circle list-inside ml-6 mt-1">
//                   {item.subItems.map((sub, sIdx) => (
//                     <li key={sIdx}>- {sub.text}</li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Résumé */}
//       <div className="mb-2">
//         <label className="block font-medium">Résumé</label>
//         <textarea
//           className="border p-2 w-full rounded"
//           rows={3}
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//         />
//       </div>

//       {/* Boutons */}
//       <div className="flex gap-2">
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Enregistrer
//         </button>
//         <button
//           type="button"
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//           onClick={onCancel}
//         >
//           Annuler
//         </button>
//       </div>
//     </form>
//   );
// }

// export default EditMeetingForm;

// frontend/src/components/EditMeetingForm.jsx
import React, { useState } from "react";

function EditMeetingForm({ meeting, onSubmit, onCancel }) {
  // On initialise l'état avec les valeurs existantes
  const [date, setDate] = useState(meeting.date.slice(0, 10)); // YYYY-MM-DD
  const [title, setTitle] = useState(meeting.title);
  const [summary, setSummary] = useState(meeting.summary);
  const [agenda, setAgenda] = useState(meeting.agenda || []);

  // Ajout d'item principal / sous-item
  const [newAgendaText, setNewAgendaText] = useState("");
  const [newSubItemText, setNewSubItemText] = useState("");
  const [parentIndex, setParentIndex] = useState(null);

  // Ajouter un item principal
  const handleAddAgendaItem = () => {
    const trimmed = newAgendaText.trim();
    if (!trimmed) return;
    setAgenda((prev) => [...prev, { text: trimmed, subItems: [] }]);
    setNewAgendaText("");
  };

  // Ajouter un sous-item
  const handleAddSubItem = () => {
    const trimmed = newSubItemText.trim();
    if (!trimmed || parentIndex === null) return;
    setAgenda((prev) => {
      const copy = [...prev];
      copy[parentIndex] = {
        ...copy[parentIndex],
        subItems: [...copy[parentIndex].subItems, { text: trimmed }],
      };
      return copy;
    });
    setNewSubItemText("");
    setParentIndex(null);
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !title) {
      alert("Date et titre obligatoires");
      return;
    }
    // On reconstruit l'objet meeting mis à jour
    const updated = {
      ...meeting,
      date,
      title,
      summary,
      agenda,
    };
    onSubmit(updated);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded shadow-sm space-y-6"
    >
      <h2 className="text-lg font-semibold mb-2 text-center">
        Éditer la réunion
      </h2>

      {/* ---- Date & Titre ---- */}
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Date */}
        <div className="flex-1">
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* Titre */}
        <div className="flex-1">
          <label className="block font-medium mb-1">Titre</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* ---- Agenda (Items + Sous-items) ---- */}
      <div>
        <label className="block font-medium mb-2">Ordre du jour</label>

        {/* Ajouter un item principal */}
        <div className="flex flex-col gap-2 sm:flex-row mb-4">
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Ajouter un point..."
            value={newAgendaText}
            onChange={(e) => setNewAgendaText(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddAgendaItem}
          >
            + Item
          </button>
        </div>

        {/* Ajouter un sous-item */}
        <div className="flex flex-col gap-2 sm:flex-row mb-4">
          <select
            className="border p-2 rounded w-full sm:w-1/2"
            value={parentIndex ?? ""}
            onChange={(e) =>
              setParentIndex(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          >
            <option value="">Item parent</option>
            {agenda.map((item, idx) => (
              <option key={idx} value={idx}>
                {item.text}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Sous-point..."
            value={newSubItemText}
            onChange={(e) => setNewSubItemText(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleAddSubItem}
          >
            + Sous-item
          </button>
        </div>

        {/* Aperçu de la structure */}
        <ul className="list-disc list-inside space-y-1">
          {agenda.map((item, idx) => (
            <li key={idx} className="ml-4">
              <b>{item.text}</b>
              {item.subItems && item.subItems.length > 0 && (
                <ul className="list-circle list-inside ml-6 mt-1">
                  {item.subItems.map((sub, sIdx) => (
                    <li key={sIdx}>- {sub.text}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ---- Résumé ---- */}
      <div>
        <label className="block font-medium mb-1">Résumé</label>
        <textarea
          className="border p-2 w-full rounded"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      {/* ---- Boutons ---- */}
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Enregistrer
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default EditMeetingForm;
