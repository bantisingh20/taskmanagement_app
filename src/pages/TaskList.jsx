 

// import React, { useState, useMemo } from 'react';
// import {
//   Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
//   IconButton, ToggleButtonGroup, ToggleButton, TextField, Select, MenuItem,
//   Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, Badge
// } from '@mui/material';
// import { Edit, Save, Add } from '@mui/icons-material';
// import { SnackbarProvider, useSnackbar } from 'notistack';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { format, isBefore } from 'date-fns';

// // Predefined statuses for UI
// const statuses = ['Pending','In Progress','Completed'];
// const severities = ['Low','Medium','High'];

 
// const TaskManager = () => (
//   <SnackbarProvider maxSnack={3}>
//     <TaskView />
//   </SnackbarProvider>
// );

// const TaskView = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [tasks, setTasks] = useState(initialTasks);
//   const [view, setView] = useState('card');
//   const [editingId, setEditingId] = useState(null);
//   const [sortKey, setSortKey] = useState('dueDate');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ title:'', status:'Pending', severity:'Low', dueDate:'' });

//   const sortedTasks = useMemo(() => {
//     return [...tasks].sort((a,b) => {
//       if(sortKey === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
//       return a[sortKey].localeCompare(b[sortKey]);
//     });
//   }, [tasks, sortKey]);

//   const handleFieldChange = (id, key, value) => {
//     setTasks(ts => ts.map(t => t.id===id ? {...t, [key]:value} : t));
//   };

//   const toggleEdit = id => setEditingId(editingId===id ? null : id);

//   const handleAddTask = () => {
//     if (!newTask.title || !newTask.dueDate) {
//       enqueueSnackbar('Title & Due Date are required', { variant:'warning' });
//       return;
//     }
//     const id = Math.max(...tasks.map(t => t.id), 0) + 1;
//     setTasks([...tasks, { id, ...newTask }]);
//     enqueueSnackbar('Task added', { variant:'success' });
//     setDialogOpen(false);
//   };

//   const onDragEnd = result => {
//     if (!result.destination) return;
//     const { source, destination, draggableId } = result;
//     if (source.droppableId !== destination.droppableId) {
//       const tid = parseInt(draggableId);
//       handleFieldChange(tid, 'status', destination.droppableId);
//       enqueueSnackbar('Status updated', { variant:'info' });
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-sky-700">Task Manager Pro</h1>
//         <div className="flex items-center gap-4">
//           <ToggleButtonGroup value={view} exclusive onChange={(_, val)=>val && setView(val)}>
//             <ToggleButton value="card">Cards</ToggleButton>
//             <ToggleButton value="table">Table</ToggleButton>
//             <ToggleButton value="board">Board</ToggleButton>
//           </ToggleButtonGroup>
//           <Tooltip title="Add Task">
//             <Fab color="primary" size="small" onClick={()=>setDialogOpen(true)}>
//               <Add />
//             </Fab>
//           </Tooltip>
//         </div>
//       </div>

//       {/* VIEW SECTIONS */}
//       {/* CARD VIEW */}
//       {view==='card' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sortedTasks.map(task => {
//             const overdue = isBefore(new Date(task.dueDate), new Date());
//             return (
//               <Paper
//                 key={task.id}
//                 className="p-4 shadow-lg hover:shadow-xl transition rounded-lg relative"
//               >
//                 <Badge
//                   color={overdue?'error':task.severity==='High'?'warning':'success'}
//                   badgeContent={task.severity}
//                   className="absolute top-2 right-2"
//                 />
//                 <div className="flex justify-between items-center mb-2">
//                   <h2 className="text-xl font-semibold">{task.title}</h2>
//                   <IconButton onClick={()=>toggleEdit(task.id)}>
//                     {editingId===task.id ? <Save color="primary"/>:<Edit/>}
//                   </IconButton>
//                 </div>
//                 {['status','dueDate'].map(field => (
//                   <div key={field} className="mb-3">
//                     <div className="text-sm text-gray-500 capitalize">{field.replace(/([A-Z])/g,' $1')}</div>
//                     {editingId===task.id ? (
//                       field==='dueDate' ? (
//                         <TextField
//                           type="date"
//                           value={task[field]}
//                           onChange={e=>handleFieldChange(task.id,field,e.target.value)}
//                           fullWidth size="small"
//                         />
//                       ) : (
//                         <Select
//                           value={task[field]}
//                           onChange={e=>handleFieldChange(task.id,field,e.target.value)}
//                           fullWidth size="small"
//                         >
//                           {statuses.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
//                         </Select>
//                       )
//                     ) : (
//                       <p className="text-gray-700">{task[field]}</p>
//                     )}
//                   </div>
//                 ))}
//               </Paper>
//             );
//           })}
//         </div>
//       )}

//       {/* TABLE VIEW */}
//       {view==='table' && (
//         <TableContainer component={Paper} className="shadow-lg">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {['Title','Status','Severity','Due Date','Actions'].map((h,i)=>(
//                   <TableCell key={h} onClick={()=>i<4 && setSortKey(h.toLowerCase().replace(' ',''))
//                   } className={i<4 ? "cursor-pointer hover:bg-gray-100":""}>
//                     <strong>{h}</strong>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sortedTasks.map(task=>(
//                 <TableRow key={task.id} hover>
//                   <TableCell>{task.title}</TableCell>
//                   {['status','severity','dueDate'].map(field=>(
//                     <TableCell key={field}>
//                       {editingId===task.id ? (
//                         field==='dueDate' ?
//                           <TextField
//                             type="date"
//                             value={task[field]}
//                             onChange={e=>handleFieldChange(task.id,field,e.target.value)}
//                             size="small"
//                           /> :
//                           <Select
//                             value={task[field]}
//                             onChange={e=>handleFieldChange(task.id,field,e.target.value)}
//                             size="small"
//                           >
//                             {(field==='status'?statuses:severities)
//                               .map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
//                           </Select>
//                       ) : (
//                         task[field]
//                       )}
//                     </TableCell>
//                   ))}
//                   <TableCell align="right">
//                     <IconButton onClick={()=>toggleEdit(task.id)}>
//                       {editingId===task.id ? <Save color="primary"/>:<Edit/>}
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* KANBAN BOARD VIEW */}
//       {view==='board' && (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="flex gap-4 overflow-auto">
//             {statuses.map(status => (
//               <Droppable droppableId={status} key={status}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex-1 bg-gray-100 p-4 rounded-lg min-w-[280px] h-fit"
//                   >
//                     <h3 className="font-bold text-lg mb-2">{status}</h3>
//                     {tasks.filter(t=>t.status===status)
//                       .map((task,index)=>(
//                         <Draggable key={task.id} draggableId={String(task.id)} index={index}>
//                           {(p)=>(
//                             <Paper
//                               ref={p.innerRef}
//                               {...p.draggableProps}
//                               {...p.dragHandleProps}
//                               className="p-4 mb-3 hover:shadow-lg transition rounded-lg cursor-grab"
//                             >
//                               <div className="flex justify-between">
//                                 <h4 className="font-medium">{task.title}</h4>
//                                 <Badge
//                                   color={task.severity==='High'?'warning':
//                                     task.severity==='Low'?'success':'info'}
//                                   badgeContent={task.severity}
//                                 />
//                               </div>
//                               <div className="text-sm text-gray-500">{task.dueDate}</div>
//                             </Paper>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//       )}

//       {/* ADD TASK DIALOG */}
//       <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
//         <DialogTitle>Add New Task</DialogTitle>
//         <DialogContent className="space-y-4 pt-2">
//           <TextField
//             label="Title" fullWidth
//             value={newTask.title}
//             onChange={e=>setNewTask({...newTask,title:e.target.value})}
//           />
//           <Select
//             fullWidth value={newTask.status}
//             onChange={e=>setNewTask({...newTask,status:e.target.value})}
//           >
//             {statuses.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
//           </Select>
//           <Select
//             fullWidth value={newTask.severity}
//             onChange={e=>setNewTask({...newTask,severity:e.target.value})}
//           >
//             {severities.map(s=><MenuItem key={s} value={s}>{s}</MenuItem>)}
//           </Select>
//           <TextField
//             label="Due Date" type="date" fullWidth
//             value={newTask.dueDate}
//             onChange={e=>setNewTask({...newTask,dueDate:e.target.value})}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={()=>setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddTask}>Add</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TaskManager;




// const initialTasks = [
//   {
//     id: 1,
//     title: 'Fix login bug',
//     status: 'Pending',
//     severity: 'High',
//     dueDate: '2025-07-15',
//   },
//   {
//     id: 2,
//     title: 'Add dark mode',
//     status: 'In Progress',
//     severity: 'Medium',
//     dueDate: '2025-07-20',
//   },
//   {
//     id: 3,
//     title: 'Optimize dashboard',
//     status: 'Completed',
//     severity: 'Low',
//     dueDate: '2025-07-10',
//   },
// ];

  
import React, { useState } from 'react';
import {
  Paper, Badge, IconButton, Typography
} from '@mui/material';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';
import EditIcon from '@mui/icons-material/Edit';

const statuses = ['Pending', 'In Progress', 'Completed'];

const initialTasks = [
  { id: 1, title: 'Fix login bug', status: 'Pending', severity: 'High', dueDate: '2025-07-15' },
  { id: 2, title: 'Add dark mode', status: 'In Progress', severity: 'Medium', dueDate: '2025-07-20' },
  { id: 3, title: 'Optimize dashboard', status: 'Completed', severity: 'Low', dueDate: '2025-07-10' },
];

const CompactKanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    setTasks((prev) =>
      prev.map((task) =>
        String(task.id) === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  return (
    <div className="p-4">
      <Typography variant="h6" className="text-sky-700 mb-4 font-semibold">
        Compact Task Board
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2 min-w-[220px]"
                >
                  <Typography variant="subtitle2" className="mb-2 text-gray-600 font-medium">
                    {status}
                  </Typography>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            elevation={1}
                            className="mb-2 p-2 rounded-sm hover:shadow-md transition"
                          >
                            <div className="flex justify-between items-center">
                              <Typography variant="body2" className="font-medium text-sm">
                                {task.title}
                              </Typography>
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Due: {task.dueDate}
                            </div>
                            <Badge
                              badgeContent={task.severity}
                              color={
                                task.severity === 'High'
                                  ? 'error'
                                  : task.severity === 'Medium'
                                  ? 'warning'
                                  : 'success'
                              }
                              className="mt-1"
                              sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16 } }}
                            />
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CompactKanbanBoard;
