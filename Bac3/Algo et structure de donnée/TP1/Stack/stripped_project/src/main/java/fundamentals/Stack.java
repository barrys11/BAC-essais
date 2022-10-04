package fundamentals;

import java.util.Arrays;
import java.util.EmptyStackException;

/**
 * Author: Pierre Schaus
 *
 * You have to implement the interface using
 * - a simple linkedList as internal structure
 * - a growing array as internal structure
 */
public interface Stack<E> {

    /**
     * Looks at the object at the top of this stack
     * without removing it from the stack
     */
    public boolean empty();

    /**
     * Returns the first element of the stack, without removing it from the stack
     *
     * @throws EmptyStackException if the stack is empty
     */
    public E peek() throws EmptyStackException;

    /**
     * Remove the first element of the stack and returns it
     *
     * @throws EmptyStackException if the stack is empty
     */
    public E pop() throws EmptyStackException;

    /**
     * Adds an element to the stack
     *
     * @param item the item to add
     */
    public void push(E item);

}

/**
 * Implement the Stack interface above using a simple linked list.
 * You should have at least one constructor withtout argument.
 * You are not allowed to use classes from java.util
 * @param <E>
 */
class LinkedStack<E> implements Stack<E> {

    private Node<E> top;        // the node on the top of the stack
    private int size;        // size of the stack

    // helper linked list class
    private class Node<E> {
        private E item;
        private Node<E> next;

        public Node(E element, Node<E> next) {
            this.item = element;
            this.next = next;
        }
    }

    @Override
    public boolean empty() {
        // TODO Implement empty method
        if (size==0) return true;
        return false;
    }

    @Override
    public E peek() throws EmptyStackException {
        // TODO Implement peek method
        if (size==0) throw new EmptyStackException();
        return top.item;
    }

    @Override
    public E pop() throws EmptyStackException {
        // TODO Implement pop method
        if (size==0) throw new EmptyStackException();
        size--;
        E first= top.item;
        top=top.next;
        return first;
    }

    @Override
    public void push(E item) {
        // TODO Implement push method
        if (size==0){
            Node node= new Node(item,null);
            top=node;
        }else{
            Node first=top;
            Node node=new Node(item,first);
            top=node;
        }
        size++;
    }
}


/**
 * Implement the Stack interface above using an array as internal representation
 * The capacity of the array should double when the number of elements exceed its length.
 * You should have at least one constructor withtout argument.
 * You are not allowed to use classes from java.util
 * @param <E>
 */
class ArrayStack<E> implements Stack<E> {

    private E[] array;        // array storing the elements on the stack
    private int size;        // size of the stack

    public ArrayStack() {
        array = (E[]) new Object[10];
    }

    @Override
    public boolean empty() {
        // TODO Implement empty method
        if (size==0) return true;
        return false;
    }

    @Override
    public E peek() throws EmptyStackException {
        // TODO Implement peek method
        if (size==0)throw new EmptyStackException();
        return array[size-1];
    }

    @Override
    public E pop() throws EmptyStackException {
        // TODO Implement pop method
        if (size==0) throw new EmptyStackException();
        E elem=array[size-1];
        size--;
        array[size]=null;
        return elem;
    }

    @Override
    public void push(E item) {
        // TODO Implement push method
        if (array.length==size){
            Object[] objects = new Object[size];
            for (int i = 0; i < size; i++) {
                objects[i]=array[i];
            }
            array= (E[]) new Object[size*2];
            for (int i = 0; i < objects.length; i++) {
                array[i]= (E) objects[i];
            }
        }
        if (size==0) array[0]=item;
        else array[size]=item;
        size++;
    }

    /*public static void main(String[] args) {
        Stack<Integer> stack=new ArrayStack<>();
        for (int i = 0; i <= 100; i++) {
            stack.push(i);
        }
        System.out.println(stack.empty());
    }*/
}