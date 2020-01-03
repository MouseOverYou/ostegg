var eggMats, letterMat 

function collectEggMats(callback){
    eggMats = []
    for (var i = 0; i < scene.materials.length; i++) {
        if (scene.materials[i].name == "eggMat") {
            eggMats.push(scene.materials[i])
        }
    }
    callback()
}

function changeMats() {
    letterMat = new BABYLON.PBRMaterial("letterMat", scene)
    letterMat.metallic = 0.67
    letterMat.roughness = 0.25
    letterMat.reflectionTexture = hdrTexture
    letterMat.alpha = 0
    letterMat.transparencyMode = 3

    var sprechBlaseMat = scene.getMaterialByName("sprechMat")
    sprechBlaseMat.reflectionTexture = hdrTexture
    sprechBlaseMat.albedoColor = new BABYLON.Color3.FromHexString("#00ccd6")
    sprechBlaseMat.metallic = 0
    sprechBlaseMat.roughness = 0.2

    var insideMat = scene.getMaterialByName("inside")
    insideMat.reflectionTexture = hdrTexture
    insideMat.albedoColor = new BABYLON.Color3.FromHexString("#60F8FF")
    insideMat.metallic = 0.16
    insideMat.roughness = 0.12

    var answerBlaseMat = scene.getMaterialByName("answerBorder")
    answerBlaseMat.reflectionTexture = hdrTexture
    answerBlaseMat.albedoColor = new BABYLON.Color3.FromHexString("#00ccd6")
    answerBlaseMat.metallic = 0
    answerBlaseMat.roughness = 0.2

    var answerInside = scene.getMaterialByName("answerInside")
    answerInside.reflectionTexture = hdrTexture
    answerInside.albedoColor = new BABYLON.Color3.FromHexString("#60F8FF")
    answerInside.metallic = 0.16
    answerInside.roughness = 0.12

    letterMat.albedoColor = new BABYLON.Color3.FromHexString("#f88000")
    letterMat.metallic = 0.4
    letterMat.roughness = 0.2
    
    var kukeMat = scene.getMaterialByName("kukeMat")
    var rabbitMat = scene.getMaterialByName("haseMat")
    var brillenMat = scene.getMaterialByName("brillenMat")

    kukeMat.reflectionTexture = hdrTexture
    kukeMat.metallic = 0.67
    kukeMat.roughness = 0.25

    var holeText = new BABYLON.Texture("/assets/hole.png", scene, true, false)
    holeMat.roughness =0
    holeMat.metallic = 0
    holeMat.albedoTexture = holeText
    holeMat.albedoColor = new BABYLON.Color3(1,1,1)
    holeMat.opacityTexture = holeText
    holeText.reflectionTexture = hdrTexture

    eggMats[0].reflectionTexture = hdrTexture
    eggMats[0].metallic = 0.75
    eggMats[0].roughness = 0.5
    eggMats[0].backFaceCulling =false

    eggMats[1].albedoTexture = new BABYLON.Texture("/assets/Color.png", scene, true, false)
    eggMats[1].reflectionTexture = hdrTexture
    eggMats[1].metallic = 0.75
    eggMats[1].roughness = 0.5
    eggMats[1].backFaceCulling =false

    eggMats[2].albedoTexture = new BABYLON.Texture("/assets/Color3.png", scene, true, false)
    eggMats[2].reflectionTexture = hdrTexture
    eggMats[2].metallic = 0.75
    eggMats[2].roughness = 0.5
    eggMats[2].backFaceCulling =false

    rabbitMat.reflectionTexture = hdrTexture
    rabbitMat.metallic = 0.58
    rabbitMat.roughness = 0.58

    brillenMat.reflectionTexture = hdrTexture
    brillenMat.albedoColor = new BABYLON.Color3.FromHexString("#f88000")
}

