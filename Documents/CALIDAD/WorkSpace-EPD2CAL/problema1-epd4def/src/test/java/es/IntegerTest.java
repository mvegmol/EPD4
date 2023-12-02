package es;

import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Clase IntegersCalculator para operaciones básicas con enteros.
 * 
 * @page additional_info Información adicional
 * En esta página se encuentra información adicional sobre la clase IntegersCalculator.
 * 
 * @image html images.png "Imgaen" width=300px height=200px
 * 
 * @table
 * | Operación      | Descripción              |
 * | -------------- | ------------------------ |
 * | Suma           | Retorna la suma de a y b. |
 * | Resta          | Retorna la resta de a y b.|
 */

public class IntegersCalculator {

    /**
     * Retorna la suma de a y b.
     * 
     * @param a primer número entero
     * @param b segundo número entero
     * @return la suma de a y b
     */
    public int add(int a, int b) {
        return (a + b);
    }
    
    /**
     * Retorna la resta de a y b.
     * 
     * @param a primer número entero
     * @param b segundo número entero
     * @return la resta de a y b
     */
    public int subtraction(int a, int b){
        return (a - b);
    }
    
    /**
     * Retorna el producto de a y b.
     * 
     * @param a primer número entero
     * @param b segundo número entero
     * @return el producto de a y b
     */
    public int multiplication(int a, int b){
        return (a * b);
    }
    
    /**
     * Retorna la división de a entre b.
     * 
     * @param a dividendo entero
     * @param b divisor entero (debe ser distinto de cero)
     * @return el cociente de a dividido por b
     * @throws ArithmeticException si b es cero
     */
    public int division(int a, int b){
        if(b == 0) {
            throw new ArithmeticException("No se puede dividir por cero");
        }
        return (a / b);
    }
    
}
