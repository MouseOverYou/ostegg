var questions, options1, options2, options3
var scale = 1, MeshWriter, option1, option2, option3, question
function createQuestionary() {

    questions = [
        {
            text: "Wann ist dieses Jahr Ostern?",
            qPX: 0.05,
            bubbleSX: 0.001,
            bubblePX: -0.55,
            correct: true
        },
        {
            text: "Wann wurde der Osterhase in Deutschland das erstemal erwähnt?",
            qPX: 0.65,
            bubbleSX: 0.0019,
            bubblePX: -0.55,
            correct: true
        },
        {
            text: 'Wer schrieb das Lied "Stups, der kleine Osterhase?"?',
            qPX: 0.35,
            bubbleSX: 0.0016,
            bubblePX: -0.65,
            correct: true
        },
    ];


    options1 = [
        {
            text: "12. April",
            position: { x: eggTask1.loadedMeshes[0].position.x * 0.02 - 0.1, y: 0.3, z: eggTask1.loadedMeshes[0].position.z },
            correct: true
        },
        {
            text: "1492",
            position: { x: eggTask2.loadedMeshes[0].position.x, y: 0.3, z: eggTask2.loadedMeshes[0].position.z },
            correct: false
        },
        {
            text: "Billie Eilish",
            position: { x: eggTask3.loadedMeshes[0].position.x * 0.02 + 0.1, y: 0.3, z: eggTask3.loadedMeshes[0].position.z },
            correct: false
        },
    ];

    options2 = [
        {
            text: "13. März",
            position: { x: 1, y: 1, z: 1 },
            correct: false
        },
        {
            text: "1678",
            position: { x: -1, y: 1, z: 1 },
            correct: true
        },
        {
            text: "Abba",
            position: { x: 1, y: 1, z: -1 },
            correct: false
        },
    ];

    options3 = [
        {
            text: " 4. April",
            position: { x: 1, y: 1, z: 1 },
            correct: false
        },
        {
            text: "2001",
            position: { x: -1, y: 1, z: 1 },
            correct: false
        },
        {
            text: "Rolf Zukowski",
            position: { x: 1, y: 1, z: -1 },
            correct: true
        },
    ];
}


function addTextInSpace(text, position, isAnswer, correct) {
    var labelTransform = new BABYLON.TransformNode(text + "_transform");
    labelTransform.position.copyFrom(position)

    let plane = BABYLON.MeshBuilder.CreatePlane(
        correct.toString(),
        { width: 1, height: 1 },
        this._scene
    );
    plane.parent = labelTransform;
    plane.isPickable = false;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    let planeTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(
        plane,
        1024,   // this is probably silly
        1024,   // this is probably silly 
        false
    );

    let inputText = new BABYLON.GUI.InputText();    // using InputText as TextBlock for autoStretchWidth functionality
    inputText.width = "0px";    // reduce the visibility of the TextInput resizing
    inputText.height = "150px";
    inputText.isHitTestVisible = false;
    inputText.background = "white";
    inputText.alpha = 1
    inputText.autoStretchWidth = true;
    inputText.text = text;
    inputText.fontSize = 50;
    inputText.color = "black";
    inputText.thickness = 0;

    planeTexture.addControl(inputText);

}
var Writer

var currentQ = -1

function nextSet() {
    
    Writer = BABYLON.MeshWriter(scene, { scale: scale });
    currentQ++;
    if (currentQ > 0) {
        question.dispose()
        option1.dispose()
        option2.dispose()
        option3.dispose()
    }

    if (currentQ > 2) {
        currentQ = 0
    }

    //QUESTIONS
    question = new Writer(
        questions[currentQ].text,
        {
            "font-family": "comic",
            "anchor": "left",
            "letter-thickness": 0.1,
            "letter-height": 1,
            "color": "#1C3870",
            "position": {
                "y": 0.60,
                "x": questions[currentQ].qPX
            }
        }
    )
    question.getMesh().scaling = new BABYLON.Vector3(0.048,0.048,0.06)
    question.getMesh().rotation.x = Math.PI / 2 * 3
    question.getMesh().rotation.y = Math.PI
    question.getMesh().name = "question"
    question.getMesh().parent = Question_P
    question.getMesh().material = letterMat

    Bubble_P.scaling.x = questions[currentQ].bubbleSX
    Bubble_P.position.x = questions[currentQ].bubblePX
    Bubble_P.position.y = 0.4

    //ANSWERS
    var answerProfile = 
    
    option1 = new Writer(
        options1[currentQ].text,
        {
            "font-family":"comic",
            "anchor": "center",
            "letter-thickness":0.1,  
            "letter-height": 3,
            "color": "#1C3870",
            "position": {
                "y": 13,
                "x": 0.0
            }
        }
    )
    option1.getMesh().rotation.x = Math.PI/2*3
    option1.getMesh().name = "option1"
    option1.getMesh().parent =eggTask1.loadedMeshes[0]
    option1.getMesh().material = letterMat
    console.log("QUESTION1")
    var size1 = option1.getMesh().getBoundingInfo().boundingBox.extendSize.x
    createBackMesh(size1, Answer_P1, eggCol1);

    option2 = new Writer(
        options2[currentQ].text,
        {
            "font-family":"comic",
            "anchor": "center",
            "letter-thickness":0.1,  
            "letter-height": 3,
            "color": "#1C3870",
            "position": {
                "y": 13,
                "x": 0.0
            }
        }
    )
    option2.getMesh().rotation.x = Math.PI/2*3
    option2.getMesh().name = "option2"
    option2.getMesh().parent =eggTask2.loadedMeshes[0]
    option2.getMesh().material = letterMat
    var size2 = option2.getMesh().getBoundingInfo().boundingBox.extendSize.x
    createBackMesh(size2, Answer_P2, eggCol2);

    option3 = new Writer(
        options3[currentQ].text,
        {
            "font-family":"comic",
            "anchor": "center",
            "letter-thickness":0.1,  
            "letter-height": 3,
            "color": "#1C3870",
            "position": {
                "y": 13,
                "x": 0.0
            }
        }
    )
    option3.getMesh().rotation.x = Math.PI/2*3
    option3.getMesh().name = "option3"
    option3.getMesh().parent =eggTask3.loadedMeshes[0]
    option3.getMesh().material = letterMat
    var size3 = option3.getMesh().getBoundingInfo().boundingBox.extendSize.x
    createBackMesh(size3, Answer_P3, eggCol3);
    
    //rename colliders to check for collisions
    if(options1[currentQ].correct){
        eggCol1.name = "correct"
    }
    else{
        eggCol1.name = "wrong"
    }
    if(options2[currentQ].correct){
        eggCol2.name = "correct"
    }
    else{
        eggCol2.name = "wrong"
    }
    if(options3[currentQ].correct){
        eggCol3.name = "correct"
    }
    else{
        eggCol3.name = "wrong"
    }
}
function createBackMesh(size1, AnswerMesh, parent){
    AnswerMesh.parent = parent;
    AnswerMesh.position.y = 9;
    AnswerMesh.scaling.x = size1 * 0.006;
}