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
public class JpaService {

    Logger logger = LoggerFactory.getLogger(JpaService.class);
    private final StudentDao studentDao;

    @Autowired
    public JpaService(StudentDao studentDao) {
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

    private Student getStudentById(int id) {
        return studentDao.findById(id).orElse(null);
    }
}
