export const codeSnippets = {
  linkedlist: {
  Insert: {
    js: `// Insert (at beginning)
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
    cpp: `// Insert (at beginning)
struct Node {
  int data;
  Node* next;
};
Node* head = nullptr;

void insertAtHead(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = head;
  head = newNode;
}`,
    Java: `// Insert (at beginning)
class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; }
}
Node head = null;

void insertAtHead(int value) {
    Node newNode = new Node(value);
    newNode.next = head;
    head = newNode;
}`,
    Python: `# Insert (at beginning)
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

head = None

def insert_at_head(value):
    global head
    new_node = Node(value)
    new_node.next = head
    head = new_node`
  },

  Delete: {
    js: `// Delete (first node)
function deleteHead() {
  if (head === null) return;
  head = head.next;
}`,
    cpp: `// Delete (first node)
void deleteHead() {
  if (head == nullptr) return;
  Node* temp = head;
  head = head->next;
  delete temp;
}`,
    Java: `// Delete (first node)
void deleteHead() {
    if (head == null) return;
    head = head.next;
}`,
    Python: `# Delete (first node)
def delete_head():
    global head
    if head is None: return
    head = head.next`
  },

  Traverse: {
    js: `// Traverse
function traverse() {
  let temp = head;
  while (temp !== null) {
    console.log(temp.data);
    temp = temp.next;
  }
}`,
    cpp: `// Traverse
void traverse() {
  Node* temp = head;
  while (temp != nullptr) {
    cout << temp->data << " ";
    temp = temp->next;
  }
}`,
    Java: `// Traverse
void traverse() {
    Node temp = head;
    while (temp != null) {
        System.out.print(temp.data + " ");
        temp = temp.next;
    }
}`,
    Python: `# Traverse
def traverse():
    temp = head
    while temp:
        print(temp.data)
        temp = temp.next`
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
      Java: `// Push in Array
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3));
arr.add(4);`,
      Python: `# Push in Array
arr = [1, 2, 3]
arr.append(4)`,
    },

    Pop: {
      js: `// Pop from Array
let arr = [1, 2, 3];
arr.pop();`,
      cpp: `// Pop from Array
vector<int> arr = {1, 2, 3};
arr.pop_back();`,
      Java: `// Pop from Array
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3));
arr.remove(arr.size() - 1);`,
      Python: `# Pop from Array
arr = [1, 2, 3]
arr.pop()`,
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
    Java: `// Stack Push
Stack<Integer> st = new Stack<>();
st.push(10);`,
    Python: `# Stack Push
stack = []
stack.append(10)`,
  },

  Pop: {
    js: `// Stack Pop
stack.pop();`,
    cpp: `// Stack Pop
st.pop(); // Note: pop() in C++ returns void`,
    Java: `// Stack Pop
st.pop(); // Returns the popped element`,
    Python: `# Stack Pop
stack.pop()`,
  },
  },

  queue: {
  Enqueue: {
    js: `// Enqueue (Add to end)
let queue = [];
queue.push(10);`,
    cpp: `// Enqueue (Add to end)
queue<int> q;
q.push(10);`,
    Java: `// Enqueue (Add to end)
Queue<Integer> q = new LinkedList<>();
q.add(10);`,
    Python: `# Enqueue (Add to end)
from collections import deque
q = deque()
q.append(10)`,
  },

  Dequeue: {
    js: `// Dequeue (Remove from front)
queue.shift();`,
    cpp: `// Dequeue (Remove from front)
q.pop(); // Returns void in C++`,
    Java: `// Dequeue (Remove from front)
q.poll(); // Returns null if empty`,
    Python: `# Dequeue (Remove from front)
q.popleft()`,
  },
  },
};
