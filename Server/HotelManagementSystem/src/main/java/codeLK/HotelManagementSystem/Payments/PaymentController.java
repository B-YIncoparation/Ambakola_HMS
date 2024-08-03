package codeLK.HotelManagementSystem.Payments;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController

@RequestMapping("/Payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-payment")
    public ResponseEntity<List<Payments>> getPayment(){
        return new ResponseEntity<List<Payments>>(paymentService.getPayment(),HttpStatus.OK);

    }

    @GetMapping("/get-payment/month/{year}/{month}")
    public ResponseEntity<List<Payments>> getPaymentsInMonth(
            @PathVariable("year") int year,
            @PathVariable("month") int month
    ){
        return new ResponseEntity<List<Payments>>(paymentService.getPaymentByMonth(year, month),HttpStatus.OK);

    }
    @GetMapping("/get-payment/year/{year}")
    public ResponseEntity<List<Payments>> getPaymentsInYear(
            @PathVariable("year") int year

    ){
        return new ResponseEntity<List<Payments>>(paymentService.getPaymentByYear(year),HttpStatus.OK);

    }
    @GetMapping("/get-payment/month-total/{year}/{month}")
    public ResponseEntity<Integer> getTotalPaymentInMonth(
            @PathVariable("year") int year,
            @PathVariable("month") int month
    ){
        return new ResponseEntity<Integer>(paymentService.getTotalPaymentForMonth(year,month),HttpStatus.OK);

    }
    @GetMapping("/get-payment/year-total/{year}")
    public ResponseEntity<Integer> getTotalPaymentInYear(
            @PathVariable("year") int year

    ){
        return new ResponseEntity<Integer>(paymentService.getTotalPaymentForYear(year),HttpStatus.OK);

    }


    @PostMapping("/add-payment")
    public ResponseEntity<Payments> getPayment(
            @RequestParam("amount") Integer amount,
            @RequestParam("paymentMethode") String paymentMethode,
            @RequestParam("date") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date date
    ){
        return new ResponseEntity<Payments>(paymentService.adPayment(amount,paymentMethode,date),HttpStatus.OK);

    }


}

