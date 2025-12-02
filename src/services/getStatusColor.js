const getStatusColor = (status) => {
    status = status.toLowerCase() 
    switch (status) {
        case 'in progress': return '--color-in-progress'; 
        case 'completed': return '--color-completed';  
        case 'not started': return '--color-not-started';  
    
        default: return '--color-text'
    }
}
export default getStatusColor 