import { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/common/Modal";
import {
  useGetAdminSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../../services/endpoints/skillApi";
import { useGetAllCategoriesQuery } from "../../services/endpoints/categoryApi";

const Skills = () => {
  const { data: skills = [], isLoading } = useGetAdminSkillsQuery();

  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleAdd = async (data) => {
    try {
      if(data.category === "")
      {
        return alert("Please select a category");
      }
      if(data.name === ""){
        return alert("Please enter a skill name");
      }
      await createSkill({ name: data.name, category:data.category }).unwrap();
      setShowAdd(false);
      
    } catch (error) {
      alert(error?.data?.message || "Failed to add skill");
    }
  };

  const handleUpdate = async (data) => {
    await updateSkill({
      id: selectedSkill._id,
      data: { name: data.name, status: data.status, category: data.category },
    }).unwrap();
    setShowEdit(false);
  };

  const handleDelete = async () => {
    await deleteSkill(selectedSkill._id).unwrap();
    setShowDelete(false);
  };

  return (
    <div className="card">
      {/* HEADER */}
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

      {isLoading && <p className="text-center py-6">Loading skills...</p>}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm tabl">
          <thead className="bg-[#c1ceb1]">
            <tr>
              <th className="px-4 py-3 text-left">Skill</th>
              <th className="px-4 py-3 text-left">Category</th>

              <th className="px-4 py-3 text-center">Jobs</th>
              <th className="px-4 py-3 text-center">Status</th>

              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id} className="hover:bg-[#e7e8e5]">
                <td className="px-4 py-3 font-medium">{skill.name}</td>
                <td className="px-4 py-3">{skill.category?.name || "-"}</td>

                <td className="px-4 py-3 text-center">{skill.jobsCount}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      skill.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {skill.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
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
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD */}
      {showAdd && (
        <SkillForm onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}

      {/* EDIT */}
      {showEdit && selectedSkill && (
        <SkillForm
          edit
          skill={selectedSkill}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}

      {/* DELETE */}
      {showDelete && selectedSkill && (
        <DeletePopup
          skill={selectedSkill}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

const SkillForm = ({ onClose, onSave, skill, edit }) => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();
  const [name, setName] = useState(skill?.name || "");
  const [status, setStatus] = useState(skill?.status || "ACTIVE");
  const [category, setCategory] = useState(skill?.category?._id || "");
  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">
        {edit ? "Edit Skill" : "Add Skill"}
      </h3>

   
      <select
        className="w-full border px-4 py-2 rounded mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>

        {isLoading ? (
          <option>Loading...</option>
        ) : (
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))
        )}
      </select>
     
      <input
        className="w-full border px-4 py-2 rounded mb-3"
        placeholder="Skill name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {edit && (
        <select
          className="w-full border px-4 py-2 rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      )}

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, status, category })}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

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

export default Skills;
