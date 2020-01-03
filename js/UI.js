function createStartBtn(myGUI){
    console.log("creatred button")
    var startB = BABYLON.GUI.Button.CreateSimpleButton("next", "next")
    startB.top = 400
    startB.children[0].color = new BABYLON.Color3(69/255, 172/255, 131/255).toHexString()
    startB.children[0].fontSize = 35
    startB.children[0].top = "-13px"
    startB.children[0].left = "0px"
    startB.children[0].height ="60px"
    startB.isVisible = true
    startB.width ="150px"
    startB.height ="50px"
    startB.color ="white"
    startB.cornerRadius = 10
    startB.thickness = 5
        startB.background = new BABYLON.Color3(248/255, 232/255, 142/255).toHexString()
    startB.color = new BABYLON.Color3(245/255, 176/255, 20/255).toHexString()
    startB.onPointerUpObservable.add(function(){
        console.log("buton clicked")
        //alert("you cliked")
        nextSet()
    })
    myGUI.addControl(startB)
}