export const codeSnippets = {
 linkedlist: {
  "Insert Head": {
    js: `// Insert at beginning
function insertAtHead(value) {
  let newNode = new Node(value);
  newNode.next = head;
  head = newNode;
}`,
    cpp: `// Insert at beginning
void insertAtHead(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = head;
  head = newNode;
}`,
    java: `// Insert at beginning
void insertAtHead(int value) {
    Node newNode = new Node(value);
    newNode.next = head;
    head = newNode;
}`,
    python: `# Insert at beginning
def insert_at_head(value):
    global head
    new_node = Node(value)
    new_node.next = head
    head = new_node`
  },

  "Insert Tail": {
    js: `// Insert at end
function insertAtTail(value) {
  let newNode = new Node(value);
  if (!head) { head = newNode; return; }
  let temp = head;
  while (temp.next) temp = temp.next;
  temp.next = newNode;
}`,
    cpp: `// Insert at end
void insertAtTail(int value) {
  Node* newNode = new Node();
  newNode->data = value;
  newNode->next = nullptr;
  if (!head) { head = newNode; return; }
  Node* temp = head;
  while (temp->next) temp = temp->next;
  temp->next = newNode;
}`,
    java: `// Insert at end
void insertAtTail(int value) {
    Node newNode = new Node(value);
    if (head == null) { head = newNode; return; }
    Node temp = head;
    while (temp.next != null) temp = temp.next;
    temp.next = newNode;
}`,
    python: `# Insert at end
def insert_at_tail(value):
    global head
    new_node = Node(value)
    if not head:
        head = new_node
        return
    temp = head
    while temp.next:
        temp = temp.next
    temp.next = new_node`
  },

  "Delete Head": {
    js: `// Delete first node
function deleteHead() {
  if (!head) return;
  head = head.next;
}`,
    cpp: `// Delete first node
void deleteHead() {
  if (!head) return;
  Node* temp = head;
  head = head->next;
  delete temp;
}`,
    java: `// Delete first node
void deleteHead() {
    if (head == null) return;
    head = head.next;
}`,
    python: `# Delete first node
def delete_head():
    global head
    if not head: return
    head = head.next`
  },

  "Delete Tail": {
    js: `// Delete last node
function deleteTail() {
  if (!head) return;
  if (!head.next) { head = null; return; }
  let temp = head;
  while (temp.next.next) temp = temp.next;
  temp.next = null;
}`,
    cpp: `// Delete last node
void deleteTail() {
  if (!head) return;
  if (!head->next) { delete head; head = nullptr; return; }
  Node* temp = head;
  while (temp->next->next) temp = temp->next;
  delete temp->next;
  temp->next = nullptr;
}`,
    java: `// Delete last node
void deleteTail() {
    if (head == null) return;
    if (head.next == null) { head = null; return; }
    Node temp = head;
    while (temp.next.next != null) temp = temp.next;
    temp.next = null;
}`,
    python: `# Delete last node
def delete_tail():
    global head
    if not head: return
    if not head.next:
        head = None
        return
    temp = head
    while temp.next.next:
        temp = temp.next
    temp.next = None`
  },

  Traverse: {
    js: `// Traverse
function traverse() {
  let temp = head;
  while (temp) {
    console.log(temp.data);
    temp = temp.next;
  }
}`,
    cpp: `// Traverse
void traverse() {
  Node* temp = head;
  while (temp) {
    cout << temp->data << " ";
    temp = temp->next;
  }
}`,
    java: `// Traverse
void traverse() {
    Node temp = head;
    while (temp != null) {
        System.out.print(temp.data + " ");
        temp = temp.next;
    }
}`,
    python: `# Traverse
def traverse():
    temp = head
    while temp:
        print(temp.data)
        temp = temp.next`
  }
},

 array: {
  Insert: {
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

  Delete: {
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

  "Linear Search": {
    js: `// Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    cpp: `// Linear Search
int linearSearch(vector<int>& arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
    Java: `// Linear Search
int linearSearch(ArrayList<Integer> arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr.get(i) == target) return i;
    }
    return -1;
}`,
    Python: `# Linear Search
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`
  },

  "Binary Search": {
    js: `// Binary Search (Sorted Array)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    cpp: `// Binary Search (Sorted Array)
int binarySearch(vector<int>& arr, int target) {
  int left = 0, right = arr.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    Java: `// Binary Search (Sorted Array)
int binarySearch(ArrayList<Integer> arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr.get(mid) == target) return mid;
        if (arr.get(mid) < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    Python: `# Binary Search (Sorted Array)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  }
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
