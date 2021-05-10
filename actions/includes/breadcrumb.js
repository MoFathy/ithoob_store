//updateBreadcrumb func that takes breadcrumbNew as a param  
//and return action type (UPDATE_BREADCRUMB_SUCCESS) and this breadcrumbNew 
export const updateBreadcrumb = (breadcrumbNew) => ({
    type: 'UPDATE_BREADCRUMB_SUCCESS',
    breadcrumbNew
})
