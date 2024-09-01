module.exports = (query) => {
    let filterStatus = [{
        name: "Tất cả",
        status: "",
        class: ""
    },
    {
        name: "Đã công bố",
        status: "posted",
        class: ""
    },
    {
        name: "Bản nháp",
        status: "draft",
        class: ""
    },
    {
        name: "Đã lên lịch",
        status: "timer",
        class: ""
    },
 ]
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status)
        filterStatus[index].class="active";
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class="active";
    }
    return filterStatus;
}