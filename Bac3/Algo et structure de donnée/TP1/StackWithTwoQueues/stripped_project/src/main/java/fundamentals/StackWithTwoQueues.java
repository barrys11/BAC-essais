package fundamentals;

import java.util.ArrayDeque;
import java.util.EmptyStackException;
import java.util.Queue;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Author: Pierre Schaus and Auguste Burlats
 * Implement the abstract data type stack using two queues
 * You are not allowed to modify or add the instance variables,
 * only the body of the methods
 */
public class StackWithTwoQueues<E> {

    Queue<E> queue1;
    Queue<E> queue2;

    public StackWithTwoQueues() {
        queue1 = new ArrayDeque();
        queue2 = new ArrayDeque();
    }

    /**
     * Looks at the object at the top of this stack
     * without removing it from the stack
     */
    public boolean empty() {
         if (queue1.isEmpty()) return true;
         return false;
    }

    /**
     * Returns the first element of the stack, without removing it from the stack
     *
     * @throws EmptyStackException if the stack is empty
     */
    public E peek() throws EmptyStackException {
        if (queue1.isEmpty()) throw new EmptyStackException();
        return queue1.peek();
    }

    /**
     * Remove the first element of the stack and returns it
     *
     * @throws EmptyStackException if the stack is empty
     */
    public E pop() throws EmptyStackException {
        if (queue1.isEmpty()){
         throw new EmptyStackException();
        }
        E sup=null;
        int res=queue1.size();
        System.out.println(res);
        int count=0;
        for (E elem:queue1){
            if (count==res-1){
                sup=elem;
                queue1.remove(sup);
            }count++;
        }
        return sup;
    }

    /**
     * Adds an element to the stack
     *
     * @param item the item to add
     */
    public void push(E item) {
        queue2.add(item);
        while (!queue1.isEmpty()){
            queue2.add(queue1.peek());
            queue1.remove();
        }Queue<E> q=queue1;
        queue1=queue2;
        queue2=q;
    }

    /*public static void main(String[] args) {
        String message = "Test of push (multiple);";
        StackWithTwoQueues<Integer> stack = new StackWithTwoQueues<>();

        for (int i = 0; i <=100; i++) {
            stack.push(i);
        }
        //System.out.println(stack.queue1);
        /*for (int i = 100; i >=0; i--) {
            assertEquals(message, i, (int) stack.pop());
        }
        System.out.println(stack.queue1);
        System.out.println("--------------------------------------------------------------");
        System.out.println("--------------------------------------------------------------");
        System.out.println(stack.queue2);
        for (int i = 100; i >= 0; i--) {
            System.out.println(stack.pop());
            System.out.println(i);
        }
        System.out.println(stack.empty());
        //System.out.println(stack.queue1);
        //assertTrue(message, stack.empty());
        //stack.queue1.remove();
        //stack.pop();
        //System.out.println(stack.queue2);
    }*/

}
