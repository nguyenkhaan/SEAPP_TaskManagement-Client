const getStatusColor = (status) => {
    status = status.toLowerCase() 
    console.log('status: ' , status) 
    switch (status) {
        case 'in progress': return '--color-in-progress'; break; 
        case 'completed': return '--color-completed'; break; 
        case 'not started': return '--color-not-started'; break; 
    
        default: return '--color-text'
    }
}
export default getStatusColor 