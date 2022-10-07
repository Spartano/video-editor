import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { getTimelineChannel, setTimelineChannel } from "../../store";
import TimeClip from "./TimeClip";
export default function TimeClips() {
  const { clips, duration } = getTimelineChannel();
  const [activeId, setActiveId] = useState(null);

  const activeClip = clips.find((clip) => clip.id === activeId);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active && active.id !== over.id) {
      //@ts-ignore
      const oldIndex = clips.findIndex((clip) => clip.id === active.id);
      //@ts-ignore
      const newIndex = clips.findIndex((clip) => clip.id === over.id);

      const newClips = arrayMove(clips, oldIndex, newIndex);

      setTimelineChannel(newClips);
      setActiveId(null);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    //@ts-ignore
    setActiveId(event.active.id);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={clips} strategy={horizontalListSortingStrategy}>
        <div className="time-clips flex px-2 w-full h-[60px] pointer-events-auto">
          {clips.map((clip, i) => (
            <TimeClip key={i} clip={clip} duration={duration} />
          ))}
          <DragOverlay>
            {activeId && activeClip ? (
              <TimeClip
                clip={activeClip}
                duration={duration}
                isOverlay={true}
              />
            ) : null}
          </DragOverlay>
        </div>
      </SortableContext>
    </DndContext>
  );
}
