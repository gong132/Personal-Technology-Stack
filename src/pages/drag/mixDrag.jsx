import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { PureComponent, Fragment } from 'react'
import _ from 'lodash'
import { Card } from 'antd'

const data = [
  {
    droppableId: 'droppableId_0',
    Draggable: [
      {
        id: 'droppableId_0_0',
        content: 'droppableId_0_content0'
      },
      {
        id: 'droppableId_0_1',
        content: 'droppableId_0_content1'
      },
      {
        id: 'droppableId_0_2',
        content: 'droppableId_0_content2'
      },
      {
        id: 'droppableId_0_3',
        content: 'droppableId_0_content3'
      },
      {
        id: 'droppableId_0_4',
        content: 'droppableId_0_content4'
      },
      {
        id: 'droppableId_0_5',
        content: 'droppableId_0_content5'
      },
    ]
  },
  {
    droppableId: 'droppableId_1',
    Draggable: [
      {
        id: 'droppableId_1_0',
        content: 'droppableId_1_content0'
      },
      {
        id: 'droppableId_1_1',
        content: 'droppableId_1_content1'
      },
      {
        id: 'droppableId_1_2',
        content: 'droppableId_1_content2'
      },
      {
        id: 'droppableId_1_3',
        content: 'droppableId_1_content3'
      },
      {
        id: 'droppableId_1_4',
        content: 'droppableId_1_content4'
      },
      {
        id: 'droppableId_1_5',
        content: 'droppableId_1_content5'
      },
    ]
  },
  {
    droppableId: 'droppableId_2',
    Draggable: [
      // {
      //   id: 'droppableId_2_0',
      //   content: 'droppableId_2_content0'
      // },
      {
        id: 'droppableId_2_1',
        content: 'droppableId_2_content1'
      },
      {
        id: 'droppableId_2_2',
        content: 'droppableId_2_content2'
      },
      {
        id: 'droppableId_2_3',
        content: 'droppableId_2_content3'
      },
      {
        id: 'droppableId_2_4',
        content: 'droppableId_2_content4'
      },
      {
        id: 'droppableId_2_5',
        content: 'droppableId_2_content5'
      },
    ]
  },
]


// a little function to help us with reordering the result
const reorder = ( droppableId, list, startIndex, endIndex) => {
  const result = Array.from(list);
  const i = _.findIndex(list, v => v.droppableId===droppableId)
  const [removed] = result[i].Draggable.splice(startIndex, 1);
  result[i].Draggable.splice(endIndex, 0, removed);

  return result;
};
// 跨list传
const reorderList = ( startDroppableId, endDroppableId, list, startIndex, endIndex) => {
  const result = Array.from(list);
  const startI = _.findIndex(list, v => v.droppableId===startDroppableId)
  const endI = _.findIndex(list, v => v.droppableId===endDroppableId)
  const [removed] = result[startI].Draggable.splice(startIndex, 1);
  result[endI].Draggable.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

class MyDragComponent extends PureComponent {

  state = {
    items: data
  };

  onDragEnd(result) {
    console.log(result)
    const { source, destination } = result
    // dropped outside the list
    if (!result.destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId,
        this.state.items,
        result.source.index,
        result.destination.index,
      );
      // this.setState({
      //   items
      // });
    }else {
      const items = reorderList(
        source.droppableId,
        destination.droppableId,
        this.state.items,
        result.source.index,
        result.destination.index,
      );
      // this.setState({
      //   items
      // });
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
        {this.state.items.map((droppableItem, index) => (
          <div style={{ float:'left' }}>
            <Droppable droppableId={droppableItem.droppableId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {droppableItem.Draggable.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}

      </DragDropContext>
    );
  }
}
export default MyDragComponent