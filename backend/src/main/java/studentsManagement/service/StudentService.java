package studentsManagement.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import studentsManagement.dal.Student;
import studentsManagement.dal.StudentDao;
import studentsManagement.utils.StudentGenerator;

import java.util.List;
import java.util.stream.StreamSupport;


@Service
public class StudentService {

    private Logger logger = LoggerFactory.getLogger(StudentService.class);
    private final StudentDao studentDao;
    private final StudentGenerator studentGenerator;


    @Autowired
    public StudentService(StudentDao studentDao, StudentGenerator studentGenerator) {
        this.studentDao = studentDao;
        this.studentGenerator = studentGenerator;
    }

    public List<Student> getAllStudents() {
        return StreamSupport.stream(studentDao.findAll().spliterator(), false) // Iterable -> Stream
                .collect(java.util.stream.Collectors.toList());
    }

    public Student insertStudent(Student student) {
        Student s = studentDao.save(student);
        logger.info("Student added: " + s);
        return s;
    }

    public Student updateStudent(Student updatedStudent) {
        studentDao.update(updatedStudent);
        logger.info("Student updated: " + updatedStudent);
        return updatedStudent;
    }

    public boolean deleteStudent(int id) {
        Student student = getStudentById(id);
        if (student != null) {
            studentDao.delete(student);
            logger.info("Student deleted: " + student);
            return true;
        } else {
            logger.warn("Student not found");
            return false;
        }
    }

    private Student getStudentById(int id) {
        return studentDao.findById(id).orElse(null);
    }

    public List<Student> insertRandomStudents(int amount) {
        List<Student> students = studentGenerator.generateStudents(amount);
        studentDao.saveAll(students);
        logger.info("Students added: " + students);
        return students;
    }
}
