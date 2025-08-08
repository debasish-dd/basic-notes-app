package com.hi.Auth.controller;

import com.hi.Auth.model.Note;
import com.hi.Auth.model.User;
import com.hi.Auth.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> createNote(@Valid @RequestBody Note note){
        return ResponseEntity.ok(noteService.createNote(note));

    }

    @GetMapping
    public ResponseEntity<List<Note>> getUserNotes(){
        return ResponseEntity.ok(noteService.getUserNotes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note noteDetails){
        return ResponseEntity.ok(noteService.updateNote(id,noteDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable Long id){
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
