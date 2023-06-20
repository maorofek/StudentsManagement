package studentsManagement.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studentsManagement.dal.Student;
import studentsManagement.dal.StudentDao;

import java.util.List;
import java.util.stream.StreamSupport;


@Service
public class StudentService {

    Logger logger = LoggerFactory.getLogger(StudentService.class);
    private final StudentDao studentDao;

    @Autowired
    public StudentService(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    public List<Student> getAllStudents() {
        return StreamSupport.stream(studentDao.findAll().spliterator(), false) // Iterable -> Stream
                .collect(java.util.stream.Collectors.toList());
    }

    //TODO: addStudent returns
    public boolean insertStudent(Student student) {
        studentDao.save(student);
        logger.info("Student added: " + student.toString());
        return true;
    }

    //TODO: addStudent returns
    public Student updateStudent(Student updatedStudent) {
        Student s = studentDao.save(updatedStudent);
        logger.info("Student updated: " + s.toString());
        return s;
    }

    public boolean deleteStudent(int id) {
        Student student = getStudentById(id);
        if (student != null) {
            studentDao.delete(student);
            logger.info("Student deleted: " + student.toString());
            return true;
        } else {
            logger.info("Student not found");
            return false;
        }
    }

    private Student getStudentById(int id) {
        return studentDao.findById(id).orElse(null);
    }

}
