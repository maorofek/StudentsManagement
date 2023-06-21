package studentsManagement.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import studentsManagement.dal.Student;
import studentsManagement.service.StudentService;

import java.util.List;

@RestController
public class Controller {

    private Logger logger = LoggerFactory.getLogger(Controller.class);
    public static final String BASE_URL = "/studentsManagement";
    public static final String APPLICATION_JSON_VALUE = "application/json";


    private final StudentService studentService;

    @Autowired
    public Controller(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            path = BASE_URL + "/getStudents",
            produces = APPLICATION_JSON_VALUE
    )
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = BASE_URL + "/insertStudent",
            produces = APPLICATION_JSON_VALUE
    )
    public boolean insertStudent(@RequestBody Student student) {
        return studentService.insertStudent(student);
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            path = BASE_URL + "/updateStudent",
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE
    )
    public Student updateStudent(@RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            path = BASE_URL + "/deleteStudent/{id}",
            produces = APPLICATION_JSON_VALUE
    )
    public boolean deleteStudent(@PathVariable int id) {
        return studentService.deleteStudent(id);
    }
}
