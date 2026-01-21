import { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { ImCross } from "react-icons/im";
import Modal from "../../components/common/Modal"

const initialSkills = [
  { id: 1, name: "React.js", level: "Advanced", jobs: 42, status: "Active" },
  { id: 2, name: "Node.js", level: "Intermediate", jobs: 35, status: "Active" },
  { id: 3, name: "UI/UX Design", level: "Beginner", jobs: 18, status: "Inactive" },
];

// main component
const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);

  /* ---------- add ---------- */
  const addSkill = (skill) => {
    setSkills((prev) => [
      ...prev,
      { ...skill, id: Date.now(), jobs: 0, status: "Active" },
    ]);
    setShowAdd(false);
  };

  /* ---------- edit ---------- */
  const updateSkill = (updated) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setShowEdit(false);
  };

  /* ---------- delete ---------- */
  const deleteSkill = () => {
    setSkills((prev) => prev.filter((s) => s.id !== selectedSkill.id));
    setShowDelete(false);
  };

  /* ---------- toggle status ---------- */
  const toggleStatus = (id) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  return (
    <div className="card">
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" />
          Add Skill
        </button>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full text-sm tabl">
          <thead className="bg-[#c1ceb1] rounded-md">
            <tr>
              <th className="px-4 py-3 text-start">Skill</th>
              <th className="px-4 py-3 text-start">Level</th>
              <th className="px-4 py-3 text-center">Jobs</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className=" select-none hover:bg-[#e7e8e5]  transition-all duration-500 scale-99 hover:scale-100 hover:border-none overflow-hidden rounded-full">
                <td className="px-4 py-3 font-medium">{skill.name}</td>
                <td className="px-4 py-3">{skill.level}</td>
                <td className="px-4 py-3 text-center">{skill.jobs}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      skill.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {skill.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => toggleStatus(skill.id)}>
                      {skill.status === "Active" ? (
                        <NoSymbolIcon className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedSkill(skill);
                        setShowEdit(true);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5 text-blue-600" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedSkill(skill);
                        setShowDelete(true);
                      }}
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {skills.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* popups */}
      {showAdd && <SkillForm onClose={() => setShowAdd(false)} onSave={addSkill} />}
      {showEdit && (
        <SkillForm
          edit
          skill={selectedSkill}
          onClose={() => setShowEdit(false)}
          onSave={updateSkill}
        />
      )}
      {showDelete && (
        <DeletePopup
          skill={selectedSkill}
          onClose={() => setShowDelete(false)}
          onConfirm={deleteSkill}
        />
      )}
    </div>
  );
};

// add and edit form
const SkillForm = ({ onClose, onSave, skill, edit }) => {
  const [form, setForm] = useState(
    skill || { name: "", level: "Beginner", jobs: 0, status: "Active" }
  );

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">
        {edit ? "Edit Skill" : "Add Skill"}
      </h3>

      <input
        type="text"
        placeholder="Skill name"
        className="w-full border px-4 py-2 rounded mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        className="w-full border px-4 py-2 rounded mb-4"
        value={form.level}
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <input
        type="number"
        placeholder="Number of jobs"
        className="w-full border px-4 py-2 rounded mb-4"
        value={form.jobs || ""}
        onChange={(e) => setForm({ ...form, jobs: parseInt(e.target.value) })}
        
      />

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={() => onSave({ ...skill, ...form })}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

// delete popup
const DeletePopup = ({ skill, onClose, onConfirm }) => (
  <Modal onClose={onClose}>
    <h3 className="text-lg font-semibold mb-4">Delete Skill</h3>
    <p className="text-sm mb-6">
      Are you sure you want to delete <b>{skill.name}</b>?
    </p>

    <div className="flex justify-end gap-3">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Cancel
      </button>
      <button onClick={onConfirm} className="btn-danger">
        Delete
      </button>
    </div>
  </Modal>
);

// const Modal = ({ children, onClose }) => (
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//     <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-4 text-gray-400"
//       >
//         <ImCross size={16} />
//       </button>
//       {children}
//     </div>
//   </div>
// );

export default Skills;
