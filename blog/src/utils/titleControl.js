
let routeTitle = '';
let siteTitle = '';

function setTitle(){
    if(!routeTitle && !siteTitle){
        document.title = 'loading...'
        return;
    }else if(!routeTitle && siteTitle){
        document.title = siteTitle;
    }else if(routeTitle && !siteTitle){
        document.title = routeTitle;
    }else if(routeTitle && siteTitle){
        document.title = `${routeTitle}-${siteTitle}`;
    }
}

export default {
    setRouteTitle(title){
        routeTitle = title;
        setTitle();
    },
    setSiteTitle(title){
        siteTitle = title;
        setTitle();
    }
}