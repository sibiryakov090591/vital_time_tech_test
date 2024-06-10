"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import Placeholder from "./Placeholder";
import ListItem from "./ListItem";

export interface IListItem {
  id: string;
  title: string;
  location: string;
  image: string;
}

const items: IListItem[] = [
  {
    id: "1",
    title: "Scotland Island",
    location: "Sydney, Australia",
    image: "/images/1.jpg",
  },
  {
    id: "2",
    title: "The Charles Grand Brasserie & Bar",
    location: "Lorem ipsum, Dolor",
    image: "/images/2.jpg",
  },
  {
    id: "3",
    title: "Bridge Climb",
    location: "Dolor, Sit amet",
    image: "/images/3.jpg",
  },
  {
    id: "4",
    title: "Scotland Island",
    location: "Sydney, Australia",
    image: "/images/4.jpg",
  },
  {
    id: "5",
    title: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
    image: "/images/5.jpg",
  },
  {
    id: "6",
    title: "Vivid Festival",
    location: "Sydney, Australia",
    image: "/images/6.jpg",
  },
];

const DraggableList = () => {
  const [list, setList] = useState(items);
  const [activeItem, setActiveItem] = useState<IListItem>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState<{
    current: number;
    active: number;
  }>(null);

  const handleDragStart = (event) => {
    const item = list.find((item) => item.id === event.active.id);
    if (item) setActiveItem(item);
  };

  const handleDragOver = (event) => {
    const { _, over } = event;

    if (over) {
      const overIndex = list.findIndex((item) => item.id === over.id);
      setPlaceholderIndex((prev) => ({
        current: overIndex,
        active: prev ? prev.active : overIndex,
      }));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveItem(null);
      setPlaceholderIndex(null);
      return;
    }

    if (active.id !== over.id) {
      setList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveItem(null);
    setPlaceholderIndex(null);
  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={list} strategy={verticalListSortingStrategy}>
          {list.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem
                key={item.id}
                id={item.id}
                item={item}
                isDragging={activeItem?.id === item.id}
                placeholder={{
                  isShow: placeholderIndex?.current === index,
                  position:
                    placeholderIndex?.current < placeholderIndex?.active
                      ? "top"
                      : "bottom",
                  element: <Placeholder item={activeItem} />,
                }}
              />
            </React.Fragment>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableList;
