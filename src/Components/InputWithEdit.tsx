import React, { useState } from "react";
import { ITodoListType } from "../type";

interface IProps {
  placeHolder: string;
  label: string;
  value: any;
  setValue: (val: string) => void;
  initialValue: string;
  setInitialValue: (val: string) => void;
  handleUpdate: () => void;
  disabled?: boolean;
  setDisabled: (val: boolean) => void;
  updating?: boolean;
}

export default function InputWithEdit({
  placeHolder,
  label,
  value,
  setValue,
  initialValue,
  setInitialValue,
  handleUpdate,
  disabled,
  setDisabled,
  updating,
}: IProps) {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div>
      <label className="text-sm font-normal text-black">{label}</label>
      <input
        type={"text"}
        placeholder={placeHolder}
        className={
          "w-full border-2 border-gray-300 rounded-lg p-2 outline-none mt-1"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />

      {/* 
      This is the button which is used to update the todo item. When user click on edit button input field will be enabled and save and cancel button will be displayed instead of edit button and user can update the todo item.
      */}
      {!edit ? (
        <div
          className="text-end text-xs font-normal text-blue-600 cursor-pointer mt-2"
          onClick={() => {
            setEdit(!edit);
            setDisabled(false);
          }}
        >
          Edit
        </div>
      ) : (
        <div className="flex justify-end gap-4 mt-2 mb-4">
          <div
            aria-disabled={updating}
            className="text-xs font-normal text-blue-600 cursor-pointer"
            onClick={() => {
              setEdit(!edit);
              setInitialValue(value);
              handleUpdate();
            }}
          >
            Save
          </div>
          <div
            aria-disabled={updating}
            className="text-xs font-normal text-blue-600 cursor-pointer"
            onClick={() => {
              setEdit(!edit);
              setValue(initialValue);
              setDisabled(true);
            }}
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
}
