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
import { toast } from "react-toastify";

const Skills = () => {
  const { data: skills = [], isLoading } = useGetAdminSkillsQuery();

  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredSkills = skills.filter((skill) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      skill.name?.toLowerCase().includes(term) ||
      skill.category?.name?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredSkills.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAdd = async (data) => {
    try {
      if(data.category === "")
      {
        return toast.error("Please select a category");
      }
      if(data.name === ""){
        return toast.error("Please enter a skill name");
      }
      await createSkill({ name: data.name, category:data.category }).unwrap();
      toast.success("Skill added successfully");
      setShowAdd(false);
      
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add skill");
    }
  };

  const handleUpdate = async (data) => {
   try {
     if(data.category === "")
     {
       return toast.error("Please select a category");
     }
     if(data.name === ""){
       return toast.error("Please enter a skill name");
     }
     await updateSkill({
       id: selectedSkill._id,
       data: { name: data.name, status: data.status, category: data.category },
     }).unwrap();
     setShowEdit(false);
     toast.success("Skill updated successfully");
   } catch (error) {
    toast.warning("Failed to update skill");
   }
  };

  const handleDelete = async () => {
    try {
      await deleteSkill(selectedSkill._id).unwrap();
      toast.error("Skill deleted successfully");
      setShowDelete(false);
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center justify-center gap-1 w-full sm:w-auto"
        >
          <PlusIcon className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search skill or category"
          className="border px-4 py-2 rounded-lg text-sm w-full md:w-72"
        />
      </div>

      {isLoading && <p className="text-center py-6">Loading skills...</p>}

      {/* TABLE */}
      <div className="hidden md:block overflow-x-auto">
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
            {paginatedSkills.map((skill) => (
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

            {filteredSkills.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {paginatedSkills.map((skill) => (
          <div
            key={skill._id}
            className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{skill.name}</div>
                <div className="text-sm text-gray-600">
                  {skill.category?.name || "-"}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  skill.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {skill.status}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="text-gray-500">Jobs:</span> {skill.jobsCount}
            </div>

            <div className="flex justify-end gap-4 pt-2">
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
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No skills found
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
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
    <Modal title={edit ? "Edit Skill" : "Add Skill"} onClose={onClose} maxWidth="max-w-md">
      {/* <h3 className="text-lg font-semibold mb-4">
        {edit ? "Edit Skill" : "Add Skill"}
      </h3> */}

   
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
  <Modal onClose={onClose} title="Delete Skill" maxWidth="max-w-sm">
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
