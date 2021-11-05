export default class Html{
    private contentDom = document.querySelector<HTMLDivElement>('#content')
    constructor(){
        // this.AddLoadingBtn()
    }

    AddLoadingBtn(){
        this.contentDom!.innerHTML = "<button disabled>Click me</button>"
    }
    RemoveLoadingBtn(){
        this.contentDom!.innerHTML = ""
    }
}