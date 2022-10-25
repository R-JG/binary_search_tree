// Unbalanced binary search tree built via item values --------------------------------------------

const BinarySearchTree = (array) => {

    const _NewNode = (value) => ({
        value,
        leftChild: null,
        rightChild: null,
    });

    const _buildTree = (value, root, _node) => {
        if (_node === undefined) _node = root;
        if (value === _node.value) {
            console.log(`Value: ${value} is already in the tree. Skipping duplicate...`); 
            return;
        };
        if (value < _node.value) {
            if (_node.leftChild === null) {
                _node.leftChild = _NewNode(value); 
                return;
            };
            _buildTree(value, root, _node.leftChild);
        };
        if (value > _node.value) {
            if (_node.rightChild === null) {
                _node.rightChild = _NewNode(value);
                return;
            };
            _buildTree(value, root, _node.rightChild);
        };
    };

    let root = ((array) => {
        const newRoot = _NewNode(array[0]);
        for (let i = 1; i < array.length; i++) {
            _buildTree(array[i], newRoot);
        };
        return newRoot;
    })(array);

    return { root }
};



// Balanced binary search tree --------------------------------------------------------------------

const BalancedBinarySearchTree = (processedArray) => {

    // private functions and variables -----------------------------------

    const _NewNode = (value, parent) => ({
        value,
        parent,
        leftChild: null,
        rightChild: null,
    });

    const _buildTree = (array, parentNode) => {
        if (array.length <= 2) {
            const node = _NewNode(array[0], parentNode);
            if (array.length === 2) {node.rightChild = _NewNode(array[1], node);};
            return node;
        };
        const middleIndex = array[Math.ceil(array.length / 2) - 1];
        const leftArray = array.slice(0, Math.ceil(array.length / 2) - 1);
        const rightArray = array.slice(Math.ceil(array.length / 2), array.length);
        const node = _NewNode(middleIndex, parentNode);
        node.leftChild = _buildTree(leftArray, node);
        node.rightChild = _buildTree(rightArray, node);
        return node;
    };

    let _root = _buildTree(processedArray, null);

    const _traverseToValue = (value, _node) => {
        if (_node === undefined) _node = _root;
        if (_node === null) return "value not found";
        if (value === _node.value) return _node;
        if (value < _node.value) return _traverseToValue(value, _node.leftChild);
        if (value > _node.value) return _traverseToValue(value, _node.rightChild);
    };

    const _buildArray = (node) => {
        let array = [];
        if (node.leftChild != null) {
            array = _buildArray(node.leftChild);
        };
        array.push(node.value);
        if (node.rightChild != null) {
            array = array.concat(_buildArray(node.rightChild));
        };
        return array;
    };

    // write functions ---------------------------------------------------

    const insertValue = (value) => {
        let rebuiltArray = _buildArray(_root);
        for (let i = 0; i < rebuiltArray.length; i++) {
            if (value === rebuiltArray[i]) {
                console.log("value already exists"); 
                return;
            };
            if (value < rebuiltArray[i]) {
                rebuiltArray.splice(i, 0, value);
                break;
            };
            if (i === rebuiltArray.length - 1) {
                rebuiltArray.splice(i + 1, 0, value);
                break;
            };
        };
        _root = _buildTree(rebuiltArray, null);
    };

    const deleteValue = (value) => {
        let rebuiltArray = _buildArray(_root);
        for (let i = 0; i < rebuiltArray.length; i++) {
            if (value === rebuiltArray[i]) {
                rebuiltArray.splice(i, 1);
                break;
            };
            if (i === rebuiltArray.length - 1) {
                console.log("value does not exist");
                return;
            };
        };
        _root = _buildTree(rebuiltArray, null);
    };

    // read functions ----------------------------------------------------

    const getRoot = () => {
        return _root;
    };

    const findValue = (value) => {
        const result = _traverseToValue(value);
        console.log(result);
        return result;
    };

    return { 
        insertValue, 
        deleteValue, 
        getRoot, 
        findValue
    };
};




const processArray = (array) => {
    const mergeSort = (array) => {
        if (array.length <= 1) return array;
        const left = array.slice(0, Math.floor(array.length / 2));
        const right = array.slice(Math.floor(array.length / 2), array.length);
        let orderedLeft = mergeSort(left);
        let orderedRight = mergeSort(right);
    
        for (let i = 0; i < array.length; i++) {
            orderedLeft[0] < orderedRight[0] ? 
            array.splice(i, 1, orderedLeft.shift()) : 
            array.splice(i, 1, orderedRight.shift());
            if (orderedLeft.length === 0) {
                array.splice(i + 1, orderedRight.length);
                array = array.concat(orderedRight);
                break;
            } else if (orderedRight.length === 0) {
                array.splice(i + 1, orderedLeft.length);
                array = array.concat(orderedLeft);
                break;
            };
        };
        return array;
    };
    const removeDuplicates = (array) => {
        const length = array.length;
        const newArray = [];
        for (let i = 0; i < length; i++) {
            (array[0] === newArray[newArray.length - 1]) ?
            array.shift() :
            newArray.push(array.shift());
        };
        return newArray;
    };
    const sortedArray = mergeSort(array);
    const processedArray = removeDuplicates(sortedArray);
    return processedArray;
};



const randomIntegerArray = (length, min, max) => {
    const newArray = [];
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min) + min);
        newArray.push(randomNumber);
    };
    return newArray;
};



// print function copied from The Odin Project ----------------------------------------------------

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

