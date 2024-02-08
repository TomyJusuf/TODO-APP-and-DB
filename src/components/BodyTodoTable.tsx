import { useState } from 'react';
import { updateItems } from '../hooks/updateData';
import { deleteItems } from '../hooks/deleteItems';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';

export default function BodyTodoTable({ importData }: any) {
  const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>(
    {}
  );
  const [isDoneStates, setIsDoneStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { mutate: updateItemData } = updateItems();
  const { mutate: deleteData } = deleteItems();

  // DELETE METHOD
  const handleDelete = (id: number) => {
    // Perform delete action using the id
    deleteData({ id, data: {} });
  };

  // PUT/UPDATE METHOD For input-editing text
  const handleEdit = (id: number) => {
    setEditStates((prev) => ({ ...prev, [id]: true }));
    const updatedData = {
      title: editedTitles[id] || '', // Use the edited title if available, otherwise use an empty string
      isDone: editStates[id] || false, // Use the edited state if available, otherwise default to false
    };
    updateItemData({ id, data: updatedData });
  };

  //PUT/UPDATE METHOD For if task is done true/falsy
  const handleIsDone = (id: number, title: string) => {
    setIsDoneStates((prev) => ({ ...prev, [id]: !prev[id] })); // Set edit state to false when toggling isDone

    const updatedData = {
      title: title,
      isDone: !isDoneStates[id], // Toggle the isDone state based on the current state of the task
    };

    updateItemData({ id, data: updatedData });
  };

  const handleEditKeyDown = (id: number, key: string) => {
    if (key === 'Enter') {
      handleEdit(id); // Save the edited value when Enter is pressed
      setEditStates((prev) => ({ ...prev, [id]: false })); // Set edit mode to false
    }
    const updatedData = {
      title: editedTitles[id] || '', // Use the edited title if available, otherwise use an empty string
      isDone: false, // Use the edited state if available, otherwise default to false
    };
    updateItemData({ id, data: updatedData });
  };

  return (
    <div className="container mx-auto w-[800px] mt-12">
      {/* start */}
      {importData.map((item: any) => {
        const { title, isDone } = item.attributes;
        const { id } = item;

        const cubeColor = isDone ? 'bg-violet-300' : 'bg-violet-600';
        return (
          <div
            className={`task_table w-full border-4 border-violet-900 flex justify-between px-6 py-4 my-2 `}
            key={id}
            data-id={id}
          >
            <div className="task_table_inputs flex justify-start items-center">
              <div
                className={`cube w-4 h-4 ${cubeColor} mr-10 cursor-pointer`}
                onClick={() => handleIsDone(id, title)}
              ></div>
              <div className="relative">
                {editStates[id] ? (
                  <input
                    type="text"
                    className="border"
                    value={editedTitles[id] || ''}
                    onChange={(e) =>
                      setEditedTitles((prev) => ({
                        ...prev,
                        [id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => handleEditKeyDown(id, e.key)}
                  />
                ) : (
                  <h1
                    className={`uppercase ${
                      isDone
                        ? 'text-violet-300 line-through'
                        : 'text-violet-600'
                    } font-bold text-xl`}
                  >
                    {title}
                  </h1>
                )}
              </div>
            </div>
            <div className="task_table_inputs flex justify-start items-center gap-x-9">
              <div
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                {/* Delete Icon SVG */}
                <DeleteIcon />
              </div>
              <div
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleEdit(id)}
              >
                {/* Edit Icon SVG */}
                <EditIcon />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
