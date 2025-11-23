import React from 'react'
import ReactDOM from 'react-dom'
function LoadingHandle({
    isLoading , finishComponent , loadingComponent //Dung de hien ra component nao tuy vao tinh trang loading 
})
{
    if (isLoading) return loadingComponent
    else if (!isLoading) return finishComponent
}
export default LoadingHandle