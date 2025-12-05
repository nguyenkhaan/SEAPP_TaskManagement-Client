const getStatusColor = (status) => {
    status = status.toLowerCase() 
    switch (status) {
        case 'in progress': return '--color-in-progress'; 
        case 'completed': return '--color-completed';  
        case 'not started': case 'to do': return '--color-not-started';    //choices=('to do', 'in progress', 'completed'),
    
        default: return '--color-text'
    }
}

// Cac ham bo sung 
const getStatusString = (str) => {
    if (str == 'to do') return 'Not Started' 
    else if (str == 'completed') return 'Completed'
    else if (str == 'in progress') return 'In Progress' 
    return '' 
}

const getPriorityString = (important , urgent) => {
    
    if (important && urgent) return 'imp/urg' 
    else if (important && !urgent) return 'important' 
    else if (important && urgent) return 'urgent' 
    return 'Moderate'
}
export default getStatusColor 
export {getStatusString , getPriorityString}