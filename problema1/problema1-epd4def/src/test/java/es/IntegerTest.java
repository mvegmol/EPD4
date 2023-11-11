package es;

import org.testng.Assert;
import org.testng.annotations.Test;

public class IntegerTest {

    @Test
    public void testAddition() {
        Integer a = 5;
        Integer b = 7;
        Integer result = a + b;
        Assert.assertEquals(result, Integer.valueOf(12));
    }

    @Test
    public void testSubtraction() {
        Integer a = 10;
        Integer b = 3;
        Integer result = a - b;
        Assert.assertEquals(result, Integer.valueOf(7));
    }

    @Test
    public void testMultiplication() {
        Integer a = 4;
        Integer b = 6;
        Integer result = a * b;
        Assert.assertEquals(result, Integer.valueOf(24));
    }

    @Test
    public void testDivision() {
        Integer a = 15;
        Integer b = 3;
        Integer result = a / b;
        Assert.assertEquals(result, Integer.valueOf(5));
    }
}

