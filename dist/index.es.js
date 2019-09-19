var t=function(t){function e(e){t.call(this),this.name="ArgumentNullException",this.message="object is null.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),e=function(t){function e(e){t.call(this),this.name="ArgumentOutOfRangeException",this.message="arrayIndex is out of range.",this.message=e}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),o=function(t){function e(e){t.call(this),this.name="ArgumentException",this.message="Invalid argument.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),r=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t),this.count=this.data.length)},n={Count:{configurable:!0}};r.prototype.add=function(t){this.data.push(t),this.count++},r.prototype.clear=function(){this.data.length=0,this.count=0},r.prototype.contains=function(t){return this.indexOf(t)>-1},r.prototype.exists=function(e){if(!e)throw new t("predicate is null.");return this.data.some(e)},r.prototype.find=function(t){return this.data.find(t)||null},r.prototype.findAll=function(t){var e=this.data.filter(t);return new r(e)},r.prototype.findIndex=function(o,r,n){if(!o)throw new t("predicate is null.");if(n=n||this.Count-1,(r=r||0)<0||r>=this.Count)throw new e("startIndex is not a valid index.");if(n<0)throw new e("count is less than 0.");if(r+n>this.Count)throw new e("startIndex and count do not specify a valid section in the list.");for(var i=-1,s=r;s<r+n;++s)if(o(this.data[s])){i=s;break}return i},r.prototype.findLast=function(e){if(!e)throw new t("predicate is null.");for(var o=null,r=this.data.length-1;r>=0;--r){var n=this.data[r];if(e(n)){o=n;break}}return o},r.prototype.findLastIndex=function(o,r,n){if(!o)throw new t("predicate is null.");if(r<0||r>=this.Count)throw new e("startIndex is not a valid index.");if(n<0)throw new e("count is less than 0.");if(r+n>this.Count)throw new e("startIndex and count do not specify a valid section in the list.");for(var i=-1,s=(r=r||0)+(n=n||this.Count)-1;s>=r;--s)if(o(this.data[s])){i=s;break}return i},r.prototype.forEach=function(e){if(!e)throw new t("action is null.");this.data.forEach(function(t){return t?e(t):void 0})},r.prototype.get=function(o){if(null==o)throw new t("index is null.");if(o<0)throw new e("index is less than 0.");if(o>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");return this.data[o]},r.prototype.indexOf=function(t){return this.data.findIndex(function(e){return e===t})},r.prototype.insert=function(t,o){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data.splice(t,0,o),this.count++},r.prototype.lastIndexOf=function(t){return this.data.lastIndexOf(t)},r.prototype.remove=function(t){var e=this.findIndex(function(e){return e===t});return-1!==e&&(this.removeAt(e),!0)},r.prototype.removeAll=function(e){if(!e)throw new t("predicate is null.");var o=this.Count;return this.data=this.data.filter(function(t){return!e(t)}),this.count=this.data.length,o-this.count},r.prototype.removeAt=function(t){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data.splice(t,1),this.count--},r.prototype.removeRange=function(t,r){if(t<0)throw new e("index is less than 0.");if(r<0)throw new e("count is less than 0.");if(t+r>this.Count)throw new o("index and count do not denote a valid range of elements in the list.");for(var n=0;n<r;)this.removeAt(t),n++},r.prototype.reverse=function(){this.data.reverse()},r.prototype.set=function(t,o){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data[t]=o},r.prototype.sort=function(t){t||(t=function(t,e){return t>e?1:-1}),this.data.sort(t)},r.prototype.toArray=function(){return[].concat(this.data)},r.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},r.prototype[Symbol.iterator]=function(){return this},n.Count.get=function(){return this.count},Object.defineProperties(r.prototype,n);var i=function(t){function e(e){t.call(this),this.name="InvalidOperationException",this.message="Invalid operation.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),s=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t))},a={Count:{configurable:!0}};s.prototype.clear=function(){this.data.length=0,this.count=0},s.prototype.contains=function(t){return this.data.findIndex(function(e){return e===t})>-1},s.prototype.dequeue=function(){if(0===this.Count)throw new i("queue is empty.");var t=this.data[0];return this.data.splice(0,1),this.count--,t},s.prototype.enqueue=function(t){this.data.push(t),this.count++},s.prototype.peek=function(){if(0===this.Count)throw new i("queue is empty.");return this.data[0]},s.prototype.toArray=function(){return[].concat(this.data)},s.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},s.prototype[Symbol.iterator]=function(){return this},a.Count.get=function(){return this.count},Object.defineProperties(s.prototype,a);var u=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t))},h={Count:{configurable:!0}};u.prototype.clear=function(){this.data.length=0,this.count=0},u.prototype.contains=function(t){return this.data.findIndex(function(e){return e===t})>-1},u.prototype.peek=function(){if(0===this.Count)throw new i("stack is empty.");return this.data[0]},u.prototype.pop=function(){if(0===this.count)throw new i("stack is empty.");var t=this.data[0];return this.data.splice(0,1),this.count--,t},u.prototype.push=function(t){this.data.splice(0,0,t),this.count++},u.prototype.toArray=function(){return[].concat(this.data)},u.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},u.prototype[Symbol.iterator]=function(){return this},h.Count.get=function(){return this.count},Object.defineProperties(u.prototype,h);var l=function(t){t&&(this.data=t)};l.prototype.getLeft=function(){return this.left},l.prototype.getRight=function(){return this.right},l.prototype.setLeft=function(t){this.left=t},l.prototype.setRight=function(t){this.right=t},l.prototype.setData=function(t){this.data=t},l.prototype.getData=function(){return this.data};var c=function(t){this.comparator=null,this.root=null,this.comparator=t};c.prototype.contains=function(t){return this.containsRecursive(this.root,t)},c.prototype.containsRecursive=function(t,e){return null!=t&&(0===this.comparator(e,t.getData())||(this.comparator(e,t.getData())<0?this.containsRecursive(t.getLeft(),e):this.containsRecursive(t.getRight(),e)))},c.prototype.insert=function(t){this.root=this.insertRecursive(this.root,t)},c.prototype.insertRecursive=function(t,e){if(null==t)return new l(e);if(this.comparator(e,t.getData())<0)t.setLeft(this.insertRecursive(t.getLeft(),e));else{if(!(this.comparator(e,t.getData())>0))return t;t.setRight(this.insertRecursive(t.getRight(),e))}return t},c.prototype.isEmpty=function(){return null==this.root},c.prototype.countNodes=function(){return this.countTreeNodes(this.root)},c.prototype.countTreeNodes=function(t){return null==t?0:1+this.countTreeNodes(t.getLeft())+this.countTreeNodes(t.getRight())},c.prototype.delete=function(t){this.root=this.deleteRecursive(this.root,t)},c.prototype.deleteRecursive=function(t,e){if(null==t)return null;if(0===this.comparator(e,t.getData())){if(null==t.getLeft()&&null==t.getRight())return null;if(null==t.getRight())return t.getLeft();if(null==t.getLeft())return t.getRight();var o=this.findSmallestValue(t.getRight());return t.setData(o),t.setRight(this.deleteRecursive(t.getRight(),o)),t}return this.comparator(e,t.getData())<0?(t.setLeft(this.deleteRecursive(t.getLeft(),e)),t):(t.setRight(this.deleteRecursive(t.getRight(),e)),t)},c.prototype.find=function(t){return null==this.root?null:this.findRecursive(this.root,t)},c.prototype.findRecursive=function(t,e){if(null==t)return null;if(e(t.getData()))return t.getData();var o=this.findRecursive(t.getLeft(),e);return null!=o?o:this.findRecursive(t.getRight(),e)},c.prototype.findSmallestValue=function(t){return null==t.getLeft()?t.getData():this.findSmallestValue(t.getLeft())},c.prototype.forEach=function(t){null!=this.root&&this.forEachRecursive(this.root,t)},c.prototype.forEachRecursive=function(t,e){null!=t&&(this.forEachRecursive(t.getLeft(),e),e(t.getData()),this.forEachRecursive(t.getRight(),e))},c.prototype.getRootData=function(){return null==this.root?null:this.root.getData()},c.prototype.search=function(t){return this.searchTree(this.root,t)},c.prototype.searchTree=function(t,e){return 0===this.comparator(e,t.getData())||!(null==t.getLeft()||!this.searchTree(t.getLeft(),e))||!(null==t.getRight()||!this.searchTree(t.getRight(),e))},c.prototype.traverseAndMapToArray=function(t,e){void 0===e&&(e="INORDER");var o=[];switch(e){case"INORDER":o=this.toArray("INORDER");break;case"PREORDER":o=this.toArray("PREORDER");break;case"POSTORDER":o=this.toArray("POSTORDER")}return o.map(function(e){return t(e)})},c.prototype.traverseAndMorph=function(t,e){var o=new c(e||this.comparator);return this.toArray("PREORDER").forEach(function(e){var r=t(e);o.insert(r)}),o},c.prototype.toArray=function(t){void 0===t&&(t="INORDER");var e=[];switch(t){case"INORDER":return this.toInorderArray(this.root,e),e;case"PREORDER":return this.toPreorderArray(this.root,e),e;case"POSTORDER":return this.toPostorderArray(this.root,e),e;default:return this.toInorderArray(this.root,e),e}},c.prototype.toInorderArray=function(t,e){null!=t&&(this.toInorderArray(t.getLeft(),e),e.push(t.getData()),this.toInorderArray(t.getRight(),e))},c.prototype.toPostorderArray=function(t,e){null!=t&&(this.toPostorderArray(t.getLeft(),e),this.toPostorderArray(t.getRight(),e),e.push(t.getData()))},c.prototype.toPreorderArray=function(t,e){null!=t&&(e.push(t.getData()),this.toPreorderArray(t.getLeft(),e),this.toPreorderArray(t.getRight(),e))};var f=function t(e){this.parent=this.left=this.right=null,this.color=t.RED,this.data=e};f.prototype.getData=function(){return this.data},f.prototype.getColor=function(){return this.color},f.prototype.getLeft=function(){return this.left},f.prototype.getParent=function(){return this.parent},f.prototype.getRight=function(){return this.right},f.prototype.getSibling=function(){return null==this.parent?null:this.isOnLeft()?this.parent.getRight():this.parent.getLeft()},f.prototype.getUncle=function(){return null==this.parent||null==this.parent.getParent()?null:this.parent.isOnLeft()?this.parent.getParent().getRight():this.parent.getParent().getLeft()},f.prototype.hasRedChild=function(){return null!=this.left&&this.left.color===f.RED||null!=this.right&&this.right.color===f.RED},f.prototype.isOnLeft=function(){return this.parent.getLeft()===this},f.prototype.moveDown=function(t){null!=this.parent&&(this.isOnLeft()?this.parent.setLeft(t):this.parent.setRight(t)),t.setParent(this.parent),this.parent=t},f.prototype.setColor=function(t){this.color=t},f.prototype.setData=function(t){this.data=t},f.prototype.setLeft=function(t){this.left=t},f.prototype.setParent=function(t){this.parent=t},f.prototype.setRight=function(t){this.right=t},f.RED=0,f.BLACK=1;var p=function(t){this.comparator=function(t,e){return t-e},t&&(this.comparator=t),this.root=null};p.prototype.countNodes=function(){return this.countTreeNodes(this.root)},p.prototype.countTreeNodes=function(t){return null==t?0:1+this.countTreeNodes(t.getLeft())+this.countTreeNodes(t.getRight())},p.prototype.delete=function(t){if(null!=this.root){var e=this.searchNode(t);e.getData()===t&&this.deleteNode(e)}},p.prototype.deleteNode=function(t){var e=this.findReplaceItem(t),o=(null==e||e.getColor()===f.BLACK)&&t.getColor()===f.BLACK,r=t.getParent();null!==e?null!=t.getLeft()&&null!=t.getRight()?(this.swapValues(e,t),this.deleteNode(e)):t===this.root?(t.setData(e.getData()),t.setLeft(null),t.setRight(null)):(t.isOnLeft()?r.setLeft(e):r.setRight(e),e.setParent(r),o?this.fixDoubleBlack(e):e.setColor(f.BLACK)):t===this.root?this.root=null:(o?this.fixDoubleBlack(t):null!=t.getSibling()&&t.getSibling().setColor(f.RED),t.isOnLeft()?r.setLeft(null):r.setRight(null))},p.prototype.findReplaceItem=function(t){return null!=t.getLeft()&&null!=t.getRight()?this.getSuccessor(t.getRight()):null==t.getLeft()&&null==t.getRight()?null:null!=t.getLeft()?t.getLeft():t.getRight()},p.prototype.fixDoubleBlack=function(t){if(t!==this.root){var e=t.getSibling(),o=t.getParent();null==e?this.fixDoubleBlack(o):e.getColor()===f.RED?(o.setColor(f.RED),e.setColor(f.BLACK),e.isOnLeft()?this.rightRotate(o):this.leftRotate(o),this.fixDoubleBlack(t)):e.hasRedChild()?(null!=e.getLeft()&&e.getLeft().getColor()===f.RED?e.isOnLeft()?(e.getLeft().setColor(e.getColor()),e.setColor(o.getColor()),this.rightRotate(o)):(e.getLeft().setColor(o.getColor()),this.rightRotate(e),this.leftRotate(o)):e.isOnLeft()?(e.getRight().setColor(o.getColor()),this.leftRotate(e),this.rightRotate(o)):(e.getRight().setColor(e.getColor()),e.setColor(o.getColor()),this.leftRotate(o)),o.setColor(f.BLACK)):(e.setColor(f.RED),o.getColor()===f.BLACK?this.fixDoubleBlack(o):o.setColor(f.BLACK))}},p.prototype.fixRedRed=function(t){if(t!==this.root){var e=t.getParent(),o=e.getParent(),r=t.getUncle();e.getColor()!==f.BLACK&&(null!=r&&r.getColor()===f.RED?(e.setColor(f.BLACK),r.setColor(f.BLACK),o.setColor(f.RED),this.fixRedRed(o)):e.isOnLeft()?(t.isOnLeft()?this.swapColors(e,o):(this.leftRotate(e),this.swapColors(t,o)),this.rightRotate(o)):(t.isOnLeft()?(this.rightRotate(e),this.swapColors(t,o)):this.swapColors(e,o),this.leftRotate(o)))}else t.setColor(f.BLACK)},p.prototype.getRoot=function(){return this.root},p.prototype.getSuccessor=function(t){for(var e=t;null!=e.getLeft();)e=e.getLeft();return e},p.prototype.insert=function(t){var e=new f(t);if(null==this.root)e.setColor(f.BLACK),this.root=e;else{var o=this.searchNode(t);if(o.getData()===t)return;e.setParent(o),this.comparator(t,o.getData())<0?o.setLeft(e):o.setRight(e),this.fixRedRed(e)}},p.prototype.isEmpty=function(){return null==this.root},p.prototype.leftRotate=function(t){var e=t.getRight();t===this.root&&(this.root=e),t.moveDown(e),t.setRight(e.getLeft()),null!=e.getLeft()&&e.getLeft().setParent(t),e.setLeft(t)},p.prototype.rightRotate=function(t){var e=t.getLeft();t===this.root&&(this.root=e),t.moveDown(e),t.setLeft(e.getRight()),null!=e.getRight()&&e.getRight().setParent(t),e.setRight(t)},p.prototype.search=function(t){return this.searchNode(t).getData()},p.prototype.searchNode=function(t){for(var e=this.root;null!=e;)if(this.comparator(t,e.getData())<0){if(null==e.getLeft())break;e=e.getLeft()}else{if(t===e.getData())break;if(null==e.getRight())break;e=e.getRight()}return e},p.prototype.swapColors=function(t,e){var o=t.getColor();t.setColor(e.getColor()),e.setColor(o)},p.prototype.swapValues=function(t,e){var o=t.getData();t.setData(e.getData()),e.setData(o)},p.prototype.toArray=function(t){return void 0===t&&(t=[]),this.isEmpty()?t:(this.toArrayRecursive(this.root,t),t)},p.prototype.toArrayRecursive=function(t,e){null!=t&&(this.toArrayRecursive(t.getLeft(),e),e.push(t.getData()),this.toArrayRecursive(t.getRight(),e))};export{r as List,s as Queue,u as Stack,c as BinaryTree,l as BinaryTreeNode,p as BinarySearchTree};
//# sourceMappingURL=index.es.js.map
