import { FC } from "react";
import { IListItem } from "./DraggableList";
import Image from "next/image";

interface Props {
  item: IListItem;
}

const Placeholder: FC<Props> = ({ item }) => {
  return (
    <div className="bg-sky-500 h-0.5 w-full relative z-10">
      <div
        className={
          "placeholder__label inline-flex items-center p-3 border rounded-lg shadow-lg bg-white"
        }
      >
        {item?.image && (
          <Image
            src={item.image}
            alt={"Draggable item photo"}
            width={25}
            height={25}
            className={`mr-3 rounded`}
          />
        )}
        <div className="font-semibold text-xs">
          {item?.title || "Drop here"}
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
