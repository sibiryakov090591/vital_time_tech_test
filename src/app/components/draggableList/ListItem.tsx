import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import { IListItem } from "./DraggableList";
import { FC } from "react";

interface Props {
  id: string;
  item: IListItem;
  placeholder: {
    isShow: boolean;
    position: "top" | "bottom";
    element: JSX.Element;
  };
}

const ListItem: FC<Props> = ({ id, item, placeholder }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex relative items-center space-x-4 p-4 bg-white`}
    >
      <div
        className={`${
          isDragging ? "block" : "hidden"
        } pointer-events-none absolute inset-0 bg-gray-100 opacity-60`}
      />
      <Image
        src={item.image}
        alt={item.title}
        width={96}
        height={96}
        className="rounded-xl"
      />
      <div>
        <h2 className="font-semibold text-lg">{item.title}</h2>
        <p className="list_item_location flex items-start text-sm">
          <Image
            src={"/images/Pin.png"}
            alt={"Pin"}
            width={16}
            height={16}
            className={`mr-1`}
          />
          {item.location}
        </p>
      </div>

      {placeholder && placeholder.isShow && (
        <div
          className={`absolute no-margin inset-x-0 ${
            placeholder.position === "bottom" ? "bottom-0" : "top-0"
          }`}
        >
          {placeholder.element}
        </div>
      )}
    </div>
  );
};

export default ListItem;
