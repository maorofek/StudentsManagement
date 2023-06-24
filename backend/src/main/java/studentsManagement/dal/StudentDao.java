package studentsManagement.dal;

import org.springframework.data.repository.CrudRepository;

public interface StudentDao extends CrudRepository<Student, Integer> {

    //TODO
    default Student update(Student student) {
        Student studentToUpdate = findById(student.getId()).orElse(null);
        assert studentToUpdate != null;
        studentToUpdate.setFirstName(student.getFirstName());
        studentToUpdate.setLastName(student.getLastName());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setGpa(student.getGpa());
        studentToUpdate.setDepartment(student.getDepartment());
        return save(studentToUpdate);
    }
}
