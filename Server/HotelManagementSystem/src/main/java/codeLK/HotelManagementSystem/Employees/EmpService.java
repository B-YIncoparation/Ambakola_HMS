package codeLK.HotelManagementSystem.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class EmpService {
    @Autowired
    private EmpRepository repository;
    public List<EmployesDTO> getAllEmployees(){
        List<Employes> employes=repository.findAll();
        List<EmployesDTO> employesDTOS=employes.stream().map((employe)->{
//            String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
            EmployesDTO employesDTO=new EmployesDTO(
                    employe.getProfileImg(),
                    employe.getEmpId(),
                    employe.getFirstName(),
                    employe.getLastName(),
                    employe.geteMail(),
                    employe.getAddress(),
                    employe.getContactNo(),
                    employe.getPosition(),
                    employe.getPassword(),
                    employe.getAvailablity()
            );
            return employesDTO;
        }).toList();
        return employesDTOS;
    }
    public EmployesDTO getEmployebyFullName(String fullName) {

        Employes employe= repository.findByfullName(fullName);
        if(employe==null){throw new RuntimeException("No resources found");}
//            String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
        EmployesDTO employeDTO=new EmployesDTO(
                employe.getProfileImg(),
                employe.getEmpId(),
                employe.getFirstName(),
                employe.getLastName(),
                employe.geteMail(),
                employe.getAddress(),
                employe.getContactNo(),
                employe.getPosition(),
                employe.getPassword(),
                employe.getAvailablity()
        );
        return employeDTO;

    }
    public EmployesDTO getEmployebyEmpId(String empId) {
        Optional<Employes> optionalEmployes= repository.findByEmpId(empId);
        Employes employe=optionalEmployes.orElseThrow(()->{
            throw new NullPointerException("No Resources found");
        });
        //String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
        EmployesDTO employeDTO=new EmployesDTO(
                employe.getProfileImg(),
                employe.getEmpId(),
                employe.getFirstName(),
                employe.getLastName(),
                employe.geteMail(),
                employe.getAddress(),
                employe.getContactNo(),
                employe.getPosition(),
                employe.getPassword(),
                employe.getAvailablity()
        );
        return employeDTO;

    }

    public Employes addEmployee(
            String img,
            String firstName,
            String lastName,
            String eMail,
            String address,
            String contactNo,
            String position,
            String password,
            String availability) throws IOException
    {
        Employes employes=new Employes(img,firstName, lastName, eMail, address, contactNo, position,password,availability);
        repository.insert(employes);
        return employes;
    }
    public Employes updateEmployee(
            String id,
            String img,
            String firstName,
            String lastName,
            String eMail,
            String address,
            String contactNo,
            String position,
            String password,
            String availability){

        Optional<Employes> optionalEmployes= repository.findByEmpId(id);
        Employes employe=optionalEmployes.orElseThrow(()->{
            throw new NullPointerException("No Resources found");
        });

        if(img!=null){employe.setProfileImg(img);}
        if(firstName!=null){ employe.setFirstName(firstName);}
        if(lastName!=null){employe.setLastName(lastName);}
        if(eMail!=null){employe.seteMail(eMail);}
        if(address!=null){employe.setAddress(address);}
        if(contactNo!=null){employe.setContactNo(contactNo);}
        if(position!=null){employe.setPosition(position);}
        if(password!=null){employe.setPassword(password);}
        if(availability!=null){employe.setAvailablity(availability);}
        repository.save(employe);
        return employe;


    }

    //Delete
    public String removeEmploye(String empId){
        Optional<Employes> optionalEmployes= repository.findByEmpId(empId);
        Employes employe=optionalEmployes.orElseThrow(()->{
            throw new NullPointerException("No Resources found");
        });
        repository.delete(employe);
        return "employee "+employe.getFirstName()+" "+employe.getLastName()+" Removed successfully";
    }


}

