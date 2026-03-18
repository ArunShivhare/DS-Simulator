export const codeSnippets = {
  linkedlist: {
    Insert: {
      js: `// Insert in Linked List (at beginning)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

let head = null;

function insertAtHead(value) {
  let newNode = new Node(value);
  newNode.next = head;
  head = newNode;
}`,

      cpp: `// Insert in Linked List (at beginning)
struct Node {
  int data;
  Node* next;
};

Node* head = NULL;

void insertAtHead(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = head;
  head = newNode;
}`,
    },

    Delete: {
      js: `// Delete from Linked List (first node)
function deleteHead() {
  if (head === null) return;
  head = head.next;
}`,

      cpp: `// Delete from Linked List (first node)
void deleteHead() {
  if (head == NULL) return;
  Node* temp = head;
  head = head->next;
  delete temp;
}`,
    },

    Traverse: {
      js: `// Traverse Linked List
function traverse() {
  let temp = head;
  while (temp !== null) {
    console.log(temp.data);
    temp = temp.next;
  }
}`,

      cpp: `// Traverse Linked List
void traverse() {
  Node* temp = head;
  while (temp != NULL) {
    cout << temp->data << " ";
    temp = temp->next;
  }
}`,
    },
  },
  array: {
    Push: {
      js: `// Push in Array
let arr = [1, 2, 3];
arr.push(4);`,
      cpp: `// Push in Array
vector<int> arr = {1, 2, 3};
arr.push_back(4);`,
    },

    Pop: {
      js: `// Pop from Array
let arr = [1, 2, 3];
arr.pop();`,
      cpp: `// Pop from Array
vector<int> arr = {1, 2, 3};
arr.pop_back();`,
    },
  },

  stack: {
    Push: {
      js: `// Stack Push
let stack = [];
stack.push(10);`,
      cpp: `// Stack Push
stack<int> st;
st.push(10);`,
    },

    Pop: {
      js: `// Stack Pop
stack.pop();`,
      cpp: `// Stack Pop
st.pop();`,
    },
  },

  queue: {
    Enqueue: {
      js: `// Enqueue
queue.push(10);`,
      cpp: `// Enqueue
queue<int> q;
q.push(10);`,
    },

    Dequeue: {
      js: `// Dequeue
queue.shift();`,
      cpp: `// Dequeue
q.pop();`,
    },
  },
};
