package studentsManagement.utils;

import org.springframework.stereotype.Component;
import studentsManagement.dal.Department;
import studentsManagement.dal.Student;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentGenerator {
    static final private int MIN_GPA = 0;
    static final private int MAX_GPA = 100;
    private static final String[] FIRST_NAMES = {
            "Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia", "Benjamin", "Mia", "Elijah", "Charlotte", "Lucas", "Amelia", "Mason", "Harper", "Logan", "Evelyn",
            "Alexander", "Abigail", "Ethan", "Emily", "Jacob", "Elizabeth", "Michael", "Mila", "Daniel", "Ella", "Henry", "Avery", "Jackson", "Sofia", "Sebastian", "Camila", "Aiden", "Scarlett", "Matthew",
            "Victoria", "Samuel", "Luna", "David", "Grace", "Joseph", "Chloe", "Carter", "Penelope", "Owen", "Layla", "Wyatt", "Riley"};
    private static final String[] LAST_NAMES = {
            "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez",
            "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson",
            "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart"};

    public List<Student> generateStudents(int numberOfStudents) {
        List<Student> students = new ArrayList<>();
        for (int i = 0; i < numberOfStudents; i++) {
            Student student = new Student();
            student.setFirstName(generateRandomFirstName());
            student.setLastName(generateRandomLastName());
            student.setEmail(generateRandomEmail());
            student.setDepartment(generateRandomDepartment());
            student.setGpa(GenerateRandomGPA());

            students.add(student);
        }
        return students;
    }


    private int GenerateRandomGPA() {
        return (int) (Math.random() * (MAX_GPA - MIN_GPA + 1) + MIN_GPA);
    }

    private Department generateRandomDepartment() {
        return Department.values()[(int) (Math.random() * Department.values().length)];
    }

    private String generateRandomFirstName() {
        return FIRST_NAMES[(int) (Math.random() * FIRST_NAMES.length)];
    }

    private String generateRandomLastName() {
        return LAST_NAMES[(int) (Math.random() * LAST_NAMES.length)];
    }

    private String generateRandomEmail() {
        return generateRandomFirstName() + "." + generateRandomLastName() + "@gmail.com";
    }
}
